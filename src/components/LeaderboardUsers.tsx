import styles from '../styles/components/LeaderboardUser.module.css';

interface LeaderboardUserProps {
  user: UserProps
  position: number
}

export type UserProps = {
  id: string
  name: string
  level: number
  currentExperience: number
  totalExperience: number
  challengesCompleted: number
  photo: string
}

export const LeaderboardUser = ({ user, position }: LeaderboardUserProps) => {

  return (
    <div className={styles.container}>
      <div className={styles.positionWrapper}>
        <h1>{position + 1}</h1>
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.profileWrapper}>
          <img src="https://media-exp1.licdn.com/dms/image/C4E03AQH_yxW1cJ3uPQ/profile-displayphoto-shrink_200_200/0/1590176780532?e=1620864000&v=beta&t=-Xy6Da49rwOGiCzH6ChtNCfZ6AxcNnZUpGrYxrLv5lE" />
          <div>
            <strong>
              {user.name}
            </strong>
            <p>
              <img src="/icons/level.svg" />
              {user.level} level

            </p>
          </div>
        </div>

        <div className={styles.experienceWrapper}>
          <p>

            <strong>{user.challengesCompleted}</strong> completados
          </p>

          <p>
            <strong>{user.totalExperience}</strong> xp
          </p>
        </div>
      </div>
    </div>
  )
}
