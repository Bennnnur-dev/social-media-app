import { type Colors } from "@/constants/colors";
import setTransparency from "@/scripts/setTransparency";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export default function createStyles(colors: Colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
      padding: 30,
    },
    inputContainer: {
      marginBottom: 20,
    },
    input: {
      borderColor: setTransparency(colors.text, 0.6),

      borderWidth: 1,
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 15,
      color: setTransparency(colors.text, 0.6),

      marginBottom: 15,
    },
    loginButton: {
      backgroundColor: colors.ternary,
      paddingVertical: 14,
      borderRadius: 999,
      alignItems: "center",
      marginBottom: 15,
    },
    loginButtonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 16,
    },
    forgotPassword: {
      alignItems: "center",
      marginBottom: 40,
    },
    forgotPasswordText: {
      color: setTransparency(colors.text, 0.6),
      fontSize: 14,
    },
    bottomContainer: {
      width,
      alignItems: "center",
      bottom: 50,
      position: "absolute",
    },
    createButton: {
      borderWidth: 1,
      borderColor: colors.ternary,
      borderRadius: 999,
      paddingVertical: 12,
      paddingHorizontal: 40,
    },
    createButtonText: {
      color: colors.ternary,
      fontWeight: "500",
      fontSize: 15,
    },
  });
}
