import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import { ProfileContext } from './ProfileContext';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import axios from 'axios';
import api from '../services/api';


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
  const { email, name, avatarUrl } = useContext(ProfileContext);
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
  const [loading, setLoading] = useState(true);

  function LoadDataUser() {
    api
      .get(`/api/user/${email}`)
      .then((response) => {
        setChallengesCompleted(response.data.user.challengesCompleted || 0)
        setLevel(response.data.user.level || 1)
        setCurrentExperience(response.data.user.totalExperience || 0)
        setLoading(false)
      })
      .catch((e) => {
        console.log('Erro ao buscar dados do user', e)
      })
  }

  useEffect(() => {
    Notification.requestPermission();
    LoadDataUser();
  }, []);

  useEffect(() => {
    if (!loading) {
      axios.post(`/api/user`, {
        level: level || 1,
        totalExperience: currentExperience,
        email: email,
        challengesCompleted,
        photo: avatarUrl,
        name: name
      })
    }
  }, [level, currentExperience, challengesCompleted]);

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
      NotificationManager.info(`Valendo ${challenge.amount}xp!`, 'Novo Desafio 🎉');
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
    if (Notification.permission === 'granted') {
      NotificationManager.error(`Tente novamente você consegue. 😄`, 'Você falhou 😢');
    }
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
    if (Notification.permission === 'granted') {
      NotificationManager.success(`Parabéns você completou o desafio, continue assim.`, 'Desafio Completo 🎉');
    }
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

  }


  return (
    <ChallengesContext.Provider
      value={{
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
      <NotificationContainer />
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}