import { type Colors } from "@/constants/colors";
import setTransparency from "@/scripts/setTransparency";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export default function createStyles(colors: Colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
    },
    username: {
      fontSize: 25,
      fontWeight: 700,
      color: colors.text,
    },
    menu: {
      marginLeft: "auto",
    },
    profileContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 15,
      marginVertical: 10,
    },
    avatar: {
      width: 85,
      height: 85,
      borderRadius: 85,
      marginRight: 20,
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      flex: 1,
    },
    statValue: {
      fontWeight: 700,
      fontSize: 20,
      color: colors.text,
    },
    statLabel: {
      fontSize: 13,
      color: colors.text,
    },

    bioContainer: {
      paddingHorizontal: 15,
      marginBottom: 10,
    },
    bioText: {
      marginTop: 2,
      fontSize: 16,
      color: colors.text,
    },
    link: {
      color: "rgb(62, 168, 255)",
      marginTop: 2,
    },
    location: {
      color: setTransparency(colors.text, 0.7),
      marginTop: 2,
    },

    buttonRow: {
      flexDirection: "row",
      paddingHorizontal: 15,
      marginBottom: 15,
    },
    editButton: {
      backgroundColor: colors.ternary,
      paddingVertical: 6,
      alignItems: "center",
      borderRadius: 4,
      width: width / 2,
      marginTop: 10,
    },
    buttonText: {
      fontWeight: 700,
      color: "white",
    },
    tabs: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingVertical: 10,
      borderTopWidth: 0.5,
      borderBottomWidth: 0.5,
      borderColor: "#ccc",
    },
    tabIcon: {
      width: 22,
      height: 22,
      resizeMode: "contain",
    },
    gridContainer: {
      alignItems: "center",
    },
    gridItem: {
      width: width / 3.2,
      height: width / 3.2,
      margin: 1,
    },
  });
}
