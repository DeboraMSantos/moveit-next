import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengesContext);
  return (
    <div className={styles.profileContainer}>
      <img src={"https://media-exp1.licdn.com/dms/image/C4E03AQH_yxW1cJ3uPQ/profile-displayphoto-shrink_100_100/0/1590176780532?e=1620259200&v=beta&t=3bP8u8Phbf6ZDgaeQKP6hPcxPM8o3IQfXFcZAvOAeI4"} alt="Débora Moura" />
      <div>
        <strong>Débora Moura dos Santos</strong>
        <p>
          <img src="icons/level.svg" alt={""} />
          Level {level}
        </p>
      </div>

    </div>
  )
}