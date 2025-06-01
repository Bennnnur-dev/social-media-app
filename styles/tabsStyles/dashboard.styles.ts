import { type Colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export default function createStyles(colors: Colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      alignItems: "center",
    },
    logo: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
    },
    headerIcons: {
      flexDirection: "row",
      gap: 12,
    },
    icon: {
      marginHorizontal: 6,
      color: colors.text,
    },
    stories: {
      marginVertical: 16,
      paddingHorizontal: 8,
    },
    storyItem: {
      alignItems: "center",
      marginHorizontal: 8,
    },
    storyImage: {
      width: 85,
      height: 85,
      borderRadius: 50,
      borderWidth: 3,
      borderColor: colors.ternary,
    },
    storyName: {
      fontSize: 14,
      marginTop: 4,
      fontWeight: 500,
      color: colors.text,
    },
    postCard: {
      marginBottom: 24,
    },
    postHeader: {
      marginTop: 10,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      marginBottom: 8,
    },
    profilePic: {
      width: 32,
      height: 32,
      borderRadius: 16,
      marginRight: 8,
    },
    username: {
      fontWeight: "bold",
      color: colors.text,
    },
    postImage: {
      width: "100%",
      height: 400,
    },
    actionsRow: {
      flexDirection: "row",
      paddingHorizontal: 8,
      marginVertical: 8,
    },
    likes: {
      paddingHorizontal: 16,
      fontWeight: "500",
      marginBottom: 4,
      color: colors.text,
    },
    caption: {
      paddingHorizontal: 16,
      marginBottom: 16,
      color: colors.text,
    },
  });
}
