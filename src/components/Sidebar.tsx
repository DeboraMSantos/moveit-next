
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from "next-auth/client";
import { useContext } from 'react';
import { FaPowerOff, FaRegLightbulb } from 'react-icons/fa';
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
      <img src="favicon.png" alt="Move.it" />

      <div title="Início" >
        <Link href="/">
          <FiHome />
        </Link>
      </div>
      <div title="Ranking" >
        <Link href="/leaderboard">
          <FiAward />
        </Link>
      </div>
      <div title="Alterar Tema" >
        <FaRegLightbulb onClick={handleToggleTheme} />
      </div>
      <div title="Fazer Logoff" >

        <FaPowerOff color="var(--green)" onClick={() => signOut()} />
      </div>
    </div>
  )
}

