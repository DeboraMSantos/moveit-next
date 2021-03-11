import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import { ProfileContext } from './ProfileContext';
import axios from 'axios';
import api from '../services/api';


interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesProviderProps {
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
  children
}: ChallengesProviderProps) {
  const { email, name, avatarUrl } = useContext(ProfileContext);
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function LoadDataUser() {
    api
      .get(`/api/user/${email}`)
      .then((response) => {
        setLevel(response.data.user.level || 1)
        setChallengesCompleted(response.data.user.challengesCompleted || 0)
        setCurrentExperience(response.data.user.totalExperience || 0)
      })
      .catch((e) => {
        console.log('Erro ao buscar dados do user', e)
      })
  }

  useEffect(() => {
    LoadDataUser();
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    axios.post(`/api/user`, {
      level: level || 1,
      totalExperience: currentExperience,
      email: email,
      challengesCompleted,
      photo: avatarUrl,
      name: name
    })
  }, [level, currentExperience, challengesCompleted])

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
        email: email,
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