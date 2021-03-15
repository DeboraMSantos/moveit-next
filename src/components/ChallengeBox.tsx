import { useContext, useRef, useEffect } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';
import Lottie from 'react-lottie';
import loadingAnimation from '../animation/clock.json';

export function ChallengeBox() {

  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
  const { resetCountdown, isActive, percentTime } = useContext(CountdownContext);
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current?.focus();
  }, [divRef.current, isActive])
  function handleChallengeCompleted() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div
          className={styles.challengeActive}

        >
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="Desafios" />

            <strong>Novo Desafio!</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeCompletedButton}
              onClick={handleChallengeCompleted}
              ref={divRef}
            >
              Completei
            </button>
          </footer>
        </div >
      ) : <>{isActive ? (

        <div className={styles.challengeNotActive}>
          <strong>O ciclo foi iniciado e no fim você receberá um novo desafio!</strong>

          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: loadingAnimation,
            }}
            width={200}
          />
          <div className={styles.loadingNumber} style={{ width: `100%` }}>{percentTime}% Completo</div>

        </div>

      )
        : (

          <div className={styles.challengeNotActive}>
            <strong>Inicie um ciclo e ao finalizar você receberá um novo desafio.</strong>
            <p><img src="icons/level-up.svg" alt="Level Up" /></p>
          Avance de level completando desafios.
          </div>
        )
      }</>}
    </div >
  );
}