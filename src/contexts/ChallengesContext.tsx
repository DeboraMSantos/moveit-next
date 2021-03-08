import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import { ProfileContext } from './ProfileContext';
import api from '../services/api';
import { useSession } from 'next-auth/client';


interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesProviderProps {
  level: number;

  currentExperience: number;
  challengesCompleted: number;
  children: ReactNode;
}

interface ChallengesProviderData {
  email: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;

}

export const ChallengesContext = createContext({} as ChallengesProviderData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [session] = useSession();
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  const [loading, setLoading] = useState(true)


  useEffect(() => {
    Notification.requestPermission();

  }, []);


  // useEffect(() => {

  //   api.post(`/api/user`, {
  //     level: level || 1,
  //     email: session.user.email,
  //     totalExperience: currentExperience,
  //     challengesCompleted: challengesCompleted,
  //     photo: session.user.image,
  //     name: session.user.name
  //   })

  // }, [level, currentExperience, challengesCompleted,])
  useEffect(() => {
    if (loading) {
      api
        .get(`/api/user/${session.user.email}`)
        .then((response) => {
          setChallengesCompleted(response.data.user.challengesCompleted || 0)
          setCurrentExperience(response.data.user.totalExperience || 0)
          setLevel(response.data.user.level || 1)
        })
        .catch((e) => {
          console.log('Erro ao buscar dados do user', e)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      api.post(`/api/user`, {
        level: level || 1,
        totalExperience: currentExperience,
        email: session.user.email,
        challengesCompleted,
        photo: session.user.image,
        name: session.user.name
      })
    }
  }, [level, currentExperience, challengesCompleted, loading])

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    if (Notification.permission === 'granted') {
      new Audio('/notification.mp3').play();
      new Notification('Novo Desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }


  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

  }


  return (
    <ChallengesContext.Provider
      value={{
        email: session.user.email,
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal
      }}>
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}