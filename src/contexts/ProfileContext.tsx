import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

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

  useEffect(() => {
    Cookies.set("cookieAvatarUrl", avatarUrl);
    Cookies.set("cookieName", name);
    Cookies.set("cookieEmail", email);
  }, []);

  return (
    <ProfileContext.Provider value={{ name, avatarUrl, email }}>
      {children}
    </ProfileContext.Provider>
  );
}