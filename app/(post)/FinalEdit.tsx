import { type Colors } from "@/constants/colors";
import useContextSnippet from "@/hooks/useContextSnippet";
import normalizeUri from "@/scripts/normaliseUri";
import createStyles from "@/styles/finalEdit.styles";
import { Redirect, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, View } from "react-native";

export default function FinalEdit() {
  const { imgData } = useLocalSearchParams();
  if (!imgData || typeof imgData !== "string") {
    return <Redirect href={`/(utils)/Error?errMsg=Impossible d'afficher l'image. Essaye plus tard.`} />;
  }
  const { context, error } = useContextSnippet();
  if (error || !context) return <Redirect href={`/(utils)/Error?errMsg=${error}`} />;
  const { getColors, theme } = context;

  const imageUri = normalizeUri(imgData);

  const colors = getColors() as Colors;
  const styles = createStyles(colors);
  return (
    <>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      <View style={styles.container}>
        <Image resizeMode="cover" source={{ uri: imageUri }} style={styles.image} />
      </View>
    </>
  );
}

// <View style={styles.topBar}>
//   <TouchableOpacity onPress={() => router.push("/(post)/Edit")}>
//     <Ionicons name="close" size={30} color={colors.text} />
//   </TouchableOpacity>
//   {!isEditingGlobal && (
//     <TouchableOpacity>
//       <Text style={styles.nextText}>Suivant</Text>
//     </TouchableOpacity>
//   )}
// </View>
