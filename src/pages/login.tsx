import Head from "next/head";

import styles from "../styles/pages/Login.module.css";

import { signIn, useSession } from "next-auth/client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import SEO from "../components/SEO";

export default function Login() {
  const [session, loading] = useSession();
  const router = useRouter();

  return (
    <>
      {!session && (
        <>
          <SEO title="Login" />
          <div className={styles.container}>
            <img src="symbol.svg" alt="Logo stripes" />
            <div>

              <img className={styles.logo} src="logo-full-white.svg" alt="Full logo" />
              <strong>Bem-vindo</strong>
              <p>Faça login para continuar</p>
              <button type="button" onClick={() => signIn("google")}>
                <img src="google.png" alt="Google logo" />
                Continuar com o Google
              </button>
            </div>
          </div>
        </>
      )}
      {session &&
        useEffect(() => {
          if (session) {
            router.push("/");
          }
        }, [])}
    </>
  );
}