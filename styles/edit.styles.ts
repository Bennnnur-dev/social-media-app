import { type Colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export default function createStyles(colors: Colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    topBar: {
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 15,
      justifyContent: "space-between",
      marginTop: 20,
    },
    nextButton: {
      backgroundColor: colors.ternary,
      paddingVertical: 6,
      paddingHorizontal: 14,
      borderRadius: 20,
    },
    nextText: {
      color: "white",
      fontWeight: "600",
    },
    imageContainer: {
      flex: 1,
      justifyContent: "center",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    foreground: {
      position: "absolute",
      width: "100%",
      height: "100%",
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    toolbar: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 20,
      marginTop: 10,
    },
    iconBox: {
      backgroundColor: colors.details,
      padding: 10,
      borderRadius: 10,
    },
    iconLabel: {
      color: colors.ternary,
      fontSize: 25,
      fontWeight: "600",
    },
  });
}
