import defaultColors from "@/constants/colors";
import useContextSnippet from "@/hooks/useContextSnippet";
import createStyles from "@/styles/error.styles";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { StatusBar } from "expo-status-bar";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ErrorScreen() {
  const { errMsg } = useLocalSearchParams();
  const { context } = useContextSnippet();

  //if there's an error loading context, stick to light theme
  const colors = !context ? defaultColors.light : context.getColors();
  const theme = !context ? "white" : context.theme;
  const styles = createStyles(colors);

  return (
    <>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      <View style={styles.container}>
        <Image source={require("@/assets/images/error-icon.png")} style={styles.image} />
        <Text style={styles.title}>Oops!</Text>
        <Text style={styles.message}>Something went wrong. Please try again later.</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
        <Text style={[styles.message, { position: "absolute", bottom: 0 }]}>Error: {errMsg}</Text>
      </View>
    </>
  );
}
