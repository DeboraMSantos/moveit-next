import React, { useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { ProfileProvider } from "../contexts/ProfileContext";

import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';
import { Sidebar } from '../components/Sidebar';
import { GitHub } from '../components/GitHub';
import { Footer } from '../components/Footer';

import styles from '../styles/pages/Home.module.css';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';


interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
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
          <Head>
            <title> Início | Move.it</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1,width=device-width " />
          </Head>
          <ChallengesProvider
            level={props.level}
            currentExperience={props.currentExperience}
            challengesCompleted={props.challengesCompleted}

          >
            <div className={styles.container}>

              <ThemeProvider>
                <Sidebar />
              </ThemeProvider>
              <GitHub />
              <ExperienceBar />
              <CountdownProvider>
                <section>
                  <div>
                    <ProfileProvider
                      avatarUrl={session.user.image}
                      name={session.user.name}
                    >
                      <Profile />
                    </ProfileProvider>
                    <CompletedChallenges />
                    <Countdown />
                  </div>
                  <div><ChallengeBox /></div>
                </section>

                <Footer />
              </CountdownProvider>
            </div>
          </ChallengesProvider>
        </>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  //chamada API
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  const user = {
    level: Number(level),
    currentExperience: Number(currentExperience),
    challengesCompleted: Number(challengesCompleted)
  }

  return {
    props: user //vai ser acessivel lá em cima em Home(props)
  }
}