import CustomText from "@/components/CustomText";
import EditText from "@/components/EditText";
import { type Colors } from "@/constants/colors";
import useContextSnippet from "@/hooks/useContextSnippet";
import useFirebaseStorage from "@/hooks/useFirebaseStorage";
import normalizeUri from "@/scripts/normaliseUri";
import captureImage from "@/scripts/viewShot";
import createStyles from "@/styles/edit.styles";
import { Ionicons } from "@expo/vector-icons";
import { type ImagePickerAsset } from "expo-image-picker";
import { Redirect, router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import ViewShot from "react-native-view-shot";

export type TextData = {
  content: string;
  fontSize: string;
  color: string;
  boldIntensity: BoldIntensity;
  backgroundShown: boolean;
  id: string;
};

export type BoldIntensity = 100 | 400 | 700;

const templateText: TextData = {
  content: "Nouveau texte",
  fontSize: "25",
  color: "rgb(255, 255, 255)",
  boldIntensity: 400,
  backgroundShown: true,
  id: Math.random().toFixed(4),
};

export default function ImageEditScreen() {
  const { imgData } = useLocalSearchParams();
  const image = JSON.parse(imgData as string) as ImagePickerAsset;

  const { context, error } = useContextSnippet();
  if (error || !context) return <Redirect href={`/(utils)/Error?errMsg=${error}`} />;

  const { getColors, isEditingGlobal, theme } = context;

  const colors = getColors() as Colors;
  const styles = createStyles(colors);

  const { uploadImage } = useFirebaseStorage();

  const [texts, setTexts] = useState<TextData[]>([]);
  const viewRef = useRef<View>(null);

  function createText() {
    if (texts.length <= 10) {
      setTexts(prev => [...prev, { ...templateText, id: Math.random().toFixed(4) }]);
    } else Alert.alert("Erreur :(", "Impossible de créer plus de 10 textes dans un poste.");
  }

  async function capturePost() {
    if (!viewRef.current) return;
    const img = await captureImage(viewRef.current);
    if (img.status === "failure" || typeof img.result !== "string") {
      return router.push(`/Error?errMsg=There was an error creating the image`);
    }
    console.log("BEFORE", img.result);
    // await uploadImage(img.result as string);
    router.push({ pathname: "/FinalEdit", params: { imgData: img.result } });
  }

  return (
    <>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.push("/(tabs)/create")}>
            <Ionicons name="close" size={30} color={colors.text} />
          </TouchableOpacity>
          {!isEditingGlobal && (
            <TouchableOpacity onPress={capturePost}>
              <Text style={styles.nextText}>Suivant</Text>
            </TouchableOpacity>
          )}
        </View>

        <ViewShot ref={viewRef} style={styles.imageContainer}>
          <View style={styles.foreground}>
            {texts.map(text => (
              <CustomText key={text.id} text={text} />
            ))}
          </View>
          <Image
            source={{
              uri: normalizeUri(image.uri),
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.background} />
        </ViewShot>

        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.iconBox} onPress={createText}>
            <Text style={styles.iconLabel}>Aa</Text>
          </TouchableOpacity>
          {/* TODO IMAGE */}
          {/* TODO */}
          {/* <TouchableOpacity style={styles.iconBox}>
            <Ionicons name="options" size={24} color={colors.text} />
          </TouchableOpacity> */}
        </View>
      </View>
      {isEditingGlobal && <EditText textsArray={texts} setTexts={setTexts} />}
    </>
  );
}
