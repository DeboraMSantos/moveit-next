
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from "next-auth/client";
import { useContext } from 'react';
import { FaGithub, FaPowerOff, FaRegLightbulb } from 'react-icons/fa';
import { FiAward, FiHome } from 'react-icons/fi';
import { ThemeContext } from '../contexts/ThemeContext';
import styles from '../styles/components/Sidebar.module.css';

export function Sidebar() {
  const router = useRouter();
  const { theme, toggleTheme } = useContext(ThemeContext);

  function handleToggleTheme() {
    toggleTheme();
  }
  return (
    <div className={styles.container}>
      <div>
        <img src="favicon.png" alt="Move.it" />
      </div>
      <div className={styles.icon} title="Início" >
        <Link href="/">
          <div>
            <FiHome />
            <p>Início</p>
          </div>
        </Link>
      </div>
      <div className={styles.icon} title="Ranking" >
        <Link href="/leaderboard">
          <div>
            <FiAward />
            <p>Ranking</p>
          </div>
        </Link>

      </div>
      <div className={styles.icon} title="Alterar Tema" >
        <div onClick={handleToggleTheme} >
          <FaRegLightbulb />
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
          <FaPowerOff onClick={() => signOut()} />
          <p>Sair</p>
        </div>
      </div>
    </div>
  )
}

