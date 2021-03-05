import styles from '../styles/components/GitHub.module.css';

export function GitHub() {
  return (
    <div className={styles.container}>
      <a
        href="https://github.com/deboraMsantos"
        target="_blank"
        rel="noopener noreferrer"
        title="Código do projeto"
      >
        <b>GitHub </b>
      </a>
    </div>
  );
}
