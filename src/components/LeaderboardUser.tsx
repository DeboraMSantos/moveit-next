import styles from '../styles/components/LeaderboardUser.module.css';

interface LeaderboardUserProps {
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
export const LeaderboardUser = ({ user, position }: LeaderboardUserProps) => {
  return (
    <div className={styles.container}>

    </div>
  )
}
