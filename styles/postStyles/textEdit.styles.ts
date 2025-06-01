import { type Colors } from "@/constants/colors";
import setTransparency from "@/scripts/setTransparency";
import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

export default function createStyles(colors: Colors) {
  return StyleSheet.create({
    container: {
      backgroundColor: setTransparency(colors.primary, 0.5),
      paddingTop: 60,
      paddingHorizontal: 16,
      position: "absolute",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 110,
    },
    doneText: {
      color: colors.ternary,
      fontSize: 20,
      fontWeight: 700,
    },
    textPreview: {
      alignItems: "center",
      marginVertical: 24,
      width: "90%",
      position: "absolute",
      top: 150,
    },
    previewTextInput: {
      fontSize: 25,
      textAlign: "center",
      width: "100%",
    },
    scrollContainer: {
      flexDirection: "row",
      paddingHorizontal: 4,
      gap: 16,
    },
    styleButton: {
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 20,
      backgroundColor: "transparent",
    },
    activeStyle: {
      backgroundColor: "white",
    },
    controls: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.details,
      paddingHorizontal: 16,
      borderRadius: 12,
      gap: 20,
      top: 100,
      position: "absolute",
    },
    colorCircle: {
      width: 27,
      height: 27,
      borderRadius: 12,
    },
    boldText: {
      color: colors.text,
      fontSize: 30,
      fontWeight: "bold",
    },
    colorPicker: {
      position: "absolute",
      top: 50,
      zIndex: 100,
    },
  });
}
