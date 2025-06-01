import { type Colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export default function createStyles(colors: Colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    image: {
      width: 120,
      height: 120,
      marginBottom: 24,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 12,
    },
    message: {
      fontSize: 16,
      color: colors.text,
      textAlign: "center",
      marginBottom: 30,
    },
    button: {
      backgroundColor: colors.ternary,
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 6,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
  });
}
