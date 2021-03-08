import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import api from '../services/api';
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
import { session, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import SEO from '../components/SEO';


interface HomeProps {
  email: string;
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

          <SEO title="Início" />

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
                      email={session.user.email}
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

//export const getServerSideProps: GetServerSideProps = async (ctx) => {

  // console.log("ctex", ctx);
  // const email = 'debyiinha@gmail.com';
  // const { data } = await api.get(`/api/user/${email}`);


  // return {
  //   props: {
  //     user: data.users ? data.users : null
  //   },
  // };
//}