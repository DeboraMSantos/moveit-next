import { useContext, useEffect } from 'react';
import Lottie from 'react-lottie';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/LevelUpModal.module.css';
import loadingAnimation from '../animation/confetti.json';

export function LevelUpModal() {
  const { level, currentExperience, challengesCompleted, closeLevelUpModal } = useContext(ChallengesContext);
  const music = new Audio('/aplausos.mp3');
  useEffect(() => {
    music.play();
  }, [])

  function handleCloseLevelUpModal() {
    closeLevelUpModal();
    music.pause();
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.animation}>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: loadingAnimation,
          }}
          width={300}
        />
      </div>

      <div className={styles.container}>
        <section>
          <div>
            <header>{level}</header>
            <strong>Parabéns</strong>
            <p>Você alcançou um novo nível.</p>
          </div>

          <div className={styles.challengesCompleted}>
            <strong>DESAFIOS</strong>
            <p><span>{challengesCompleted}</span>  completados</p>
            <hr />
            <strong> EXPERIÊNCIA</strong>
            <p><span>{currentExperience}</span>   xp</p>
            <hr />
            <img className={styles.logo} src="logo-purple.svg" alt="Full logo" />
          </div>
          <button type="button" onClick={handleCloseLevelUpModal}>
            <img src="/icons/close.svg" alt="Fechar Modal" />
          </button>
        </section>
      </div>
    </div>
  );
}