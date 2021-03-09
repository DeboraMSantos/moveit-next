import { createContext } from "react";

interface ProfileContextData {
  avatarUrl: string;
  name: string;
  email: string;
}

export const ProfileContext = createContext({} as ProfileContextData);

export function ProfileProvider({ children, ...userData }) {
  const name = userData.name;
  const avatarUrl = userData.avatarUrl;
  const email = userData.email;

  return (
    <ProfileContext.Provider value={{ name, avatarUrl, email }}>
      {children}
    </ProfileContext.Provider>
  );
}