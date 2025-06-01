import { type Colors } from "@/constants/colors";
import setTransparency from "@/scripts/setTransparency";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export default function createStyles(colors: Colors) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      flex: 1,
    },
    userInfo: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
    },
    avatar: {
      width: 35,
      height: 35,
      borderRadius: 17.5,
      marginRight: 10,
    },
    nameContainer: {
      flex: 1,
    },
    name: {
      color: colors.text,
      fontWeight: 700,
    },
    date: {
      color: setTransparency(colors.text, 0.6),
      fontSize: 12,
      marginTop: 3,
    },
    options: {
      marginLeft: 10,
    },
    dots: {
      color: colors.text,
      fontSize: 18,
    },
    postImage: {
      width: width,
      height: width,
      resizeMode: "cover",
    },
    actions: {
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      gap: 12,
    },
    likes: {
      color: colors.text,
      paddingHorizontal: 15,
      fontSize: 13,
    },
    bold: {
      fontWeight: 700,
    },
  });
}
