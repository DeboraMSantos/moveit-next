import { FaGithub } from 'react-icons/fa';
import styles from '../styles/components/Footer.module.css';

export function Footer() {
  return (
    <div className={styles.container}>
      <footer>
        Desenvolvido por&ensp;
        <a href="https://www.linkedin.com/in/d%C3%A9bora-moura-dos-santos-57813335/" target="_blank" rel="noreferrer">
          Débora Moura dos Santos
        </a>
          &ensp;durante a NLW4 da&ensp;
        <a href="https://rocketseat.com.br" target="_blank" rel="noreferrer">
          Rocketseat 🚀
        </a>
      </footer>
    </div>
  );
}
