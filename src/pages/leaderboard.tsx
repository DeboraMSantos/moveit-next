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
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const res = await fetch('https://.../users')
//   const users = await res.json()

//   return {
//     props: {
//       users,
//     },
//   }
// }
export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get('/api/user');
  console.log("data", data.users);
  return {
    props: {
      user: data.users
    },
  };
};
//export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const { client } = await connectToDatabase()

  // const isConnected = await client.isConnected()

  // return {
  //   props: { isConnected },
  // }
//   const user = [{
//     id: 1,
//     name: "Débora Moura dos Santos",
//     level: 1,
//     currentExperience: 1,
//     totalExperience: 1000,
//     challengesCompleted: 1,
//     photo: ""
//   },
//   {
//     id: 2,
//     name: "Débora Moura",
//     level: 1,
//     currentExperience: 1,
//     totalExperience: 30,
//     challengesCompleted: 3,
//     photo: ""
//   }
//     ,
//   {
//     id: 3,
//     name: "Débora Moura",
//     level: 1,
//     currentExperience: 1,
//     totalExperience: 30,
//     challengesCompleted: 4,
//     photo: ""
//   }
//     ,
//   {
//     id: 4,
//     name: "Débora Moura",
//     level: 1,
//     currentExperience: 1,
//     totalExperience: 20,
//     challengesCompleted: 4,
//     photo: ""
//   }
//     ,
//   {
//     id: 5,
//     name: "Débora Moura",
//     level: 1,
//     currentExperience: 1,
//     totalExperience: 20,
//     challengesCompleted: 3,
//     photo: ""
//   }
//     ,
//   {
//     id: 6,
//     name: "Débora Moura",
//     level: 1,
//     currentExperience: 1,
//     totalExperience: 200,
//     challengesCompleted: 3,
//     photo: ""
//   }
//     ,
//   {
//     id: 7,
//     name: "Débora Moura",
//     level: 1,
//     currentExperience: 1,
//     totalExperience: 200,
//     challengesCompleted: 3,
//     photo: ""
//   }
//     ,
//   {
//     id: 8,
//     name: "Débora Moura",
//     level: 1,
//     currentExperience: 1,
//     totalExperience: 200,
//     challengesCompleted: 3,
//     photo: ""
//   },
//   {
//     id: 9,
//     name: "Débora Moura",
//     level: 1,
//     currentExperience: 1,
//     totalExperience: 200,
//     challengesCompleted: 3,
//     photo: ""
//   },
//   {
//     id: 10,
//     name: "Débora Moura",
//     level: 1,
//     currentExperience: 1,
//     totalExperience: 200,
//     challengesCompleted: 3,
//     photo: ""
//   }
//   ]

//   user.sort(function (a, b) { return (b.totalExperience - a.totalExperience) || (b.challengesCompleted - a.challengesCompleted) });

//   return {

//     props: {
//       user: user,
//       position: 1
//     }//vai ser acessivel lá em cima em Home(props)
//   }
// }


