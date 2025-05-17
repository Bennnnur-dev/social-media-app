import { type Colors } from "@/constants/colors";
import useColorScheme, { type Theme } from "@/hooks/useColorScheme";
import { createContext } from "react";

export type ContextType = {
  theme: Theme;
  toggleTheme: () => void;
  getColors: () => Colors;
};

export const appContext = createContext<ContextType | null>(null);

export default function ContextWrapper({ children }: { children: React.ReactNode }) {
  //theme logic
  const { theme, getColors, toggleTheme } = useColorScheme();

  const values: ContextType = {
    theme,
    getColors,
    toggleTheme,
  };

  return <appContext.Provider value={values}>{children}</appContext.Provider>;
}
