import styles from '../styles/components/LeaderboardUsers.module.css';

interface LeaderboardUsersProps {
  user: UserProps
  position: number
}

export type UserProps = {
  _id: string
  name: string
  level: number
  currentExperience: number
  totalExperience: number
  challengesCompleted: number
  photo: string
}
export const LeaderboardUsers = ({ user, position }: LeaderboardUsersProps) => {
  return (
    <div className={styles.container}>

    </div>
  )
}
