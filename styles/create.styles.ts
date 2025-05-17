import { type Colors } from "@/constants/colors";
import setTransparency from "@/scripts/setTransparency";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export default function createStyles(colors: Colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
    },
    header: {
      height: 50,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headerText: {
      color: "white",
      fontSize: 16,
      fontWeight: "600",
    },
    nextText: {
      color: "#007AFF",
      fontWeight: "600",
    },
    previewContainer: {
      width: "100%",
      height: width,
      backgroundColor: "#222",
    },
    previewImage: {
      width: "100%",
      height: "100%",
    },
    bottomSheet: {
      flex: 1,
      backgroundColor: "#111",
      paddingTop: 12,
      paddingHorizontal: 12,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    label: {
      color: "white",
      fontSize: 16,
      fontWeight: "500",
    },
    icons: {
      flexDirection: "row",
    },
    icon: {
      marginLeft: 16,
    },
    imageWrapper: {
      margin: 4,
      borderRadius: 4,
      overflow: "hidden",
    },
    galleryImage: {
      width: width / 3 - 18,
      height: width / 3 - 18,
    },
    infoText: {
      marginTop: 10,
      color: setTransparency(colors.text, 0.5),
      width: "80%",
    },
    focused: {
      borderWidth: 3,
      borderColor: colors.text,
    },
  });
}
