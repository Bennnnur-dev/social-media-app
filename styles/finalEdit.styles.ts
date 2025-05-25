import { type Colors } from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export default function createStyles(colors: Colors) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      flex: 1,
    },
    image: {
      width,
      height: width / 2,
    },
    captionContainer: {
      width: "90%",
      marginHorizontal: "auto",
      marginTop: 10,
    },
    captionTitle: {
      color: colors.text,
      fontWeight: 600,
      fontSize: 20,
    },
    formInput: {
      color: colors.text,
      fontSize: 20,
      fontWeight: 200,
    },
    nextButtonContainer: {
      width: "100%",
      position: "absolute",
      alignItems: "center",
    },
    nextButton: {
      backgroundColor: colors.ternary,
      paddingVertical: 6,
      paddingHorizontal: 30,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "white",
    },
    nextText: {
      color: "white",
      fontWeight: 600,
    },
  });
}
