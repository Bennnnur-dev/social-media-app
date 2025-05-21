import CustomText from "@/components/CustomText";
import EditText from "@/components/EditText";
import { type Colors } from "@/constants/colors";
import useContextSnippet from "@/hooks/useContextSnippet";
import createStyles from "@/styles/edit.styles";
import { Ionicons } from "@expo/vector-icons";
import { type ImagePickerAsset } from "expo-image-picker";
import { Redirect, router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

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

  const { getColors, isEditingGlobal } = context;

  const colors = getColors() as Colors;
  const styles = createStyles(colors);

  const [texts, setTexts] = useState<TextData[]>([]);

  function createText() {
    if (texts.length <= 10) {
      setTexts(prev => [...prev, { ...templateText, id: Math.random().toFixed(4) }]);
    } else Alert.alert("Erreur :(", "Impossible de créer plus de 10 textes dans un poste.");
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.push("/(tabs)/create")}>
            <Ionicons name="close" size={30} color={colors.text} />
          </TouchableOpacity>
          {!isEditingGlobal && (
            <TouchableOpacity style={styles.nextButton}>
              <Text style={styles.nextText}>Publier →</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.imageContainer}>
          <View style={styles.foreground}>
            {texts.map(text => {
              return <CustomText key={text.id} text={{ ...text }} />;
            })}
          </View>
          <Image source={{ uri: image.uri }} style={styles.image} resizeMode="contain" />
        </View>

        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.iconBox} onPress={createText}>
            <Text style={styles.iconLabel}>Aa</Text>
          </TouchableOpacity>
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
