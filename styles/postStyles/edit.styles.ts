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
    nextText: {
      color: colors.ternary,
      fontWeight: "600",
    },
    imageContainer: {
      flex: 1,
      justifyContent: "center",
    },
    image: {
      width: "100%",
      height: "100%",
      zIndex: 40,
    },
    foreground: {
      position: "absolute",
      width: "100%",
      height: "100%",
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    background: {
      backgroundColor: "gray",
      width: "100%",
      height: "100%",
      zIndex: 30,
      position: "absolute",
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
      color: colors.text,
      fontSize: 25,
      fontWeight: "600",
    },
  });
}
