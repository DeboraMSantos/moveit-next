import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';


interface ThemeContextData {
  theme: string;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext({} as ThemeContextData);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const chooseTheme = Cookies.get('theme');
    setTheme(chooseTheme || 'light');
  }, []);

  useEffect(() => {
    Cookies.set('theme', theme);
  }, [theme]);


  function toggleTheme() {

    if (theme === 'light') {
      document.documentElement.style.setProperty('--white', '#21262D');
      document.documentElement.style.setProperty('--background', '#0D1117');
      document.documentElement.style.setProperty('--gray-line', '#dcdde0');
      document.documentElement.style.setProperty('--text', '#C9D1D9');
      document.documentElement.style.setProperty('--text-highlight', '#b3b9ff');
      document.documentElement.style.setProperty('--title', '#CCD6F6');
      document.documentElement.style.setProperty('--red', '#C53030');
      document.documentElement.style.setProperty('--green', '#4CD62B');
      document.documentElement.style.setProperty('--blue', '#5965e0');
      document.documentElement.style.setProperty('--blue-dark', '#5931A9');
      document.documentElement.style.setProperty('--blue-twitter', '#2AA9E0');
      setTheme('dark');
    }
    else {
      document.documentElement.style.setProperty('--white', '#fff');
      document.documentElement.style.setProperty('--background', '#f2f3f5');
      document.documentElement.style.setProperty('--gray-line', '#dcdde0');
      document.documentElement.style.setProperty('--text', '#555');
      document.documentElement.style.setProperty('--text-highlight', '#b3b9ff');
      document.documentElement.style.setProperty('--title', '#2e384d');
      document.documentElement.style.setProperty('--red', '#e83f5b');
      document.documentElement.style.setProperty('--green', '#4cd62b');
      document.documentElement.style.setProperty('--blue', '#5965e0');
      document.documentElement.style.setProperty('--blue-dark', '#4953b8');
      document.documentElement.style.setProperty('--blue-twitter', '#2aa9e0');
      setTheme('light');
    }
  }
  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
