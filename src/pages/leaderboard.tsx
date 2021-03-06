import Head from "next/head";
import React from "react";
import { LeaderboardUsers } from "../components/LeaderboardUsers";
import { Sidebar } from "../components/Sidebar";
import { ThemeProvider } from "../contexts/ThemeContext";

import styles from "../styles/pages/Leaderboard.module.css";
import { useSession } from "next-auth/client";
import { GitHub } from "../components/GitHub";

interface LeaderboardProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}
export default function Leaderboard(props: LeaderboardProps) {
  const [session, loading] = useSession();
  return (
    <>
      <Head>
        <title> Ranking 🏆 | move.it</title>
      </Head>
      <div className={styles.container}>

        <ThemeProvider>
          <Sidebar />
        </ThemeProvider>
        <GitHub />
        Ranking 🏆
      </div>
    </>
  );
}