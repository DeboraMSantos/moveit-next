import Head from "next/head";
import React, { useEffect } from "react";
import { LeaderboardUser, UserProps } from "../components/LeaderboardUsers";
import { Sidebar } from "../components/Sidebar";
import { ThemeProvider } from "../contexts/ThemeContext";
import styles from "../styles/pages/Leaderboard.module.css";
import { useSession } from "next-auth/client";
import { GitHub } from "../components/GitHub";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

interface LeaderboardProps {
  user: UserProps[]
  position: number
}


export default function Leaderboard(props: LeaderboardProps) {

  const [session, loading] = useSession();
  const router = useRouter();
  return (
    <>
      {!session &&
        useEffect(() => {
          if (!session) {
            router.push("/login");
          }
        }, [])}
      {session && (
        <div className={styles.wrapper}>
          <Head>
            <title> Ranking 🏆 | Move.it</title>
          </Head>
          <div className={styles.container}>

            <ThemeProvider>
              <Sidebar />
            </ThemeProvider>
            <GitHub />
            <h1>Ranking 🏆</h1>

            <div className={styles.ranking}>
              <div className={styles.rankingTitle}>
                <div>
                  <strong>Posição</strong>
                  <strong>Usuário</strong>
                </div>
                <div>
                  <strong>Desafios</strong>
                  <strong>Experiência</strong>
                </div>
              </div>
              <div>
                {props?.user?.map((user, i) => (
                  <LeaderboardUser position={i} user={user} />
                ))}
              </div>
            </div>

          </div >
        </div>
      )
      }
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const user = [{
    id: 1,
    name: "Débora M",
    level: 1,
    currentExperience: 1,
    totalExperience: 10,
    challengesCompleted: 1,
    photo: ""
  },
  {
    id: 2,
    name: "joe Moura",
    level: 1,
    currentExperience: 1,
    totalExperience: 30,
    challengesCompleted: 1,
    photo: ""
  }
    ,
  {
    id: 0,
    name: "Joe Moura",
    level: 1,
    currentExperience: 1,
    totalExperience: 20,
    challengesCompleted: 1,
    photo: ""
  }
  ]

  user.sort(u => u.totalExperience);
  user.reverse();

  return {

    props: {
      user: user,
      position: 1
    }//vai ser acessivel lá em cima em Home(props)
  }
}


