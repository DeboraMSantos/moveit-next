import styles from '../styles/components/LeaderboardCard.module.css';

interface LeaderboardCardProps {
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

export const LeaderboardCard = ({ user, position }: LeaderboardCardProps) => {

  return (
    <div className={styles.container}>


      <p>{position + 1}</p>

      <div className={styles.avatar}>
        <img src="https://media-exp1.licdn.com/dms/image/C4E03AQH_yxW1cJ3uPQ/profile-displayphoto-shrink_200_200/0/1590176780532?e=1620864000&v=beta&t=-Xy6Da49rwOGiCzH6ChtNCfZ6AxcNnZUpGrYxrLv5lE" />
        <div>
          <strong>{user.name}</strong>
          <p>
            <img src="/icons/level.svg" />
            {user.level} level
          </p>
        </div>
      </div>

      <div className={styles.experience}>
        <p>{user.challengesCompleted}</p>
        <p> completados </p>
      </div>
      <div className={styles.experience}>
        <p>{user.totalExperience}</p>
        <p>xp
          </p>
      </div>


    </div>
  )
}
