import React, { useEffect } from "react";
import { LeaderboardCard, UserProps } from "../components/LeaderboardCard";
import { Sidebar } from "../components/Sidebar";
import { ThemeProvider } from "../contexts/ThemeContext";
import styles from "../styles/pages/Leaderboard.module.css";
import { useSession } from "next-auth/client";
import { GitHub } from "../components/GitHub";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Footer } from "../components/Footer";
import SEO from "../components/SEO";
import api from '../services/api'

interface LeaderboardProps {
  user: UserProps[]

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
                <LeaderboardCard key={i} position={i} user={user} />
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
