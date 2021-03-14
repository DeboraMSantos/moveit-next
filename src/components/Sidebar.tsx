
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from "next-auth/client";
import { useContext } from 'react';
import { FaGithub } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { RiLightbulbFlashLine, RiLightbulbLine, RiLogoutBoxLine, RiTrophyLine } from 'react-icons/ri';

import { ThemeContext } from '../contexts/ThemeContext';
import styles from '../styles/components/Sidebar.module.css';

export function Sidebar() {
  const router = useRouter();
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log("theme:", theme);
  function handleToggleTheme() {
    toggleTheme();
  }
  return (
    <aside className={styles.container}>
      <div>
        <img src="favicon.png" alt="Move.it" />
      </div>
      <div className={styles.icon} title="Início" >
        <Link href="/">
          <div>
            {router.pathname === '/' &&
              <div className={styles.flagSidebar}></div>}
            <AiOutlineClockCircle />
            <p>Início</p>
          </div>

        </Link>
      </div>
      <div className={styles.icon} title="Ranking" >
        <Link href="/leaderboard">
          <div>
            {router.pathname === '/leaderboard' &&
              <div className={styles.flagSidebar}></div>}
            <RiTrophyLine />
            <p>Ranking</p>


          </div>
        </Link>

      </div>

      <div className={styles.icon} title={theme === "light" ? "Alterar para tema escuro" : "Alterar para tema claro"}>
        <div onClick={handleToggleTheme} >
          {theme === "light" ? (
            <RiLightbulbFlashLine />
          ) : (<RiLightbulbLine />)}
          <p>Tema</p>
        </div>
      </div>

      <div className={`${styles.icon} ${styles.iconGithub}`} title="Código do projeto" >
        <a
          href="https://github.com/deboraMsantos"
          target="_blank"
          rel="noopener noreferrer"
          title="Código do projeto"
        >
          <FaGithub />
        </a>
      </div>
      <div className={styles.icon} title="Fazer Logoff" >
        <div>
          <RiLogoutBoxLine onClick={() => signOut()} />
          <p>Sair</p>
        </div>
      </div>
    </aside >
  )
}

