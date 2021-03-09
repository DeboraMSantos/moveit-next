import React, { useEffect } from "react";
import SEO from "../components/SEO";
import api from '../services/api'
import styles from "../styles/pages/Leaderboard.module.css";
import { Footer } from "../components/Footer";
import { GitHub } from "../components/GitHub";
import { LeaderboardCard, UserProps } from "../components/LeaderboardCard";
import { Sidebar } from "../components/Sidebar";
import { ThemeProvider } from "../contexts/ThemeContext";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

interface LeaderboardProps {
  user: UserProps[]
}

export default function Leaderboard(props: LeaderboardProps) {

  const [session] = useSession();
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
        <>
          <SEO title="Ranking 🏆" />
          <ThemeProvider>
            <Sidebar />
          </ThemeProvider>
          <GitHub />
          <div className={styles.container}>
            <h1>Ranking 🏆</h1>
            <div>
              <p>Posição</p>
              <p>Usuário</p>
              <p>Desafios</p>
              <p>Experiência</p>
            </div>
            <div>
              {props?.user?.map((user, i) => (
                <LeaderboardCard position={i} user={user} />
              ))}
            </div>
            <br />
            <Footer />
          </div>

        </>
      )
      }
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get('/api/user');

  return {
    props: {
      user: data.users ? data.users : null
    },
  };
};
