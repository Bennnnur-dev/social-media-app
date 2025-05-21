import colors, { type Colors } from "@/constants/colors";
import { useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";

export type Theme = "light" | "dark" | ColorSchemeName;

export default function useColorScheme() {
  const defaultTheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  function getColors(): Colors {
    return theme === "dark" ? colors.dark : colors.light;
  }

  return { theme, getColors, toggleTheme };
}
