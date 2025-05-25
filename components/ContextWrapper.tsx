import { type TextData } from "@/app/(post)/Edit";
import { type Colors } from "@/constants/colors";
import useColorScheme, { type Theme } from "@/hooks/useColorScheme";
import { createContext, useState } from "react";

export type ContextType = {
  theme: Theme;
  toggleTheme: () => void;
  getColors: () => Colors;
  isEditingGlobal: boolean;
  setIsEditingGlobal: React.Dispatch<React.SetStateAction<boolean>>;
  text: TextData | null;
  setText: React.Dispatch<React.SetStateAction<TextData | null>>;
};

export const appContext = createContext<ContextType | null>(null);

export default function ContextWrapper({ children }: { children: React.ReactNode }) {
  //theme logic
  const { theme, getColors, toggleTheme } = useColorScheme();

  //post edit
  const [isEditingGlobal, setIsEditingGlobal] = useState(false);
  const [text, setText] = useState<TextData | null>(null); //text to edit

  const values: ContextType = {
    theme,
    getColors,
    toggleTheme,
    isEditingGlobal,
    setIsEditingGlobal,
    text,
    setText,
  };

  return <appContext.Provider value={values}>{children}</appContext.Provider>;
}
