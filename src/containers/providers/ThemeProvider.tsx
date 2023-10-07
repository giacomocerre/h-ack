import React, { createContext, useState } from 'react';

interface ThemeContextType {
  theme: string;
  toggleTheme: (desiredTheme: string) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode; // Specify the type of children prop
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState('dark'); // Default theme is 'light'

  const toggleTheme = (desiredTheme:string) => {
    setTheme(desiredTheme);
  };

  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
