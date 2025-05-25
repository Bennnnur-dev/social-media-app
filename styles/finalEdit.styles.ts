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
      height: width,
    },
  });
}
