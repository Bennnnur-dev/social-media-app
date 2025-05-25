import { type Colors } from "@/constants/colors";
import useFirebaseStorage from "@/hooks/firebase/useFirebaseStorage";
import useFirestore from "@/hooks/firebase/useFirestore";
import useContextSnippet from "@/hooks/useContextSnippet";
import normalizeUri from "@/scripts/normaliseUri";
import createStyles from "@/styles/finalEdit.styles";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { useSharedValue, withSpring, withTiming } from "react-native-reanimated";

export type Post = {
  title: string;
  description: string;
};

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
  const { postToDB } = useFirestore();
  const { uploadImage } = useFirebaseStorage();

  const inputRef = useRef<TextInput>(null);

  const [titleText, setTitleText] = useState("");
  const [descText, setDescText] = useState("");

  //focus to input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const animatedPosition = useSharedValue(-200);

  useEffect(() => {
    if (!titleText) animatedPosition.value = withTiming(-200);
    else animatedPosition.value = withSpring(20);
  }, [titleText]);

  async function publishPost() {
    const post: Post = {
      title: titleText,
      description: descText,
    };
    const data = await postToDB(post);
    if (data.status === "failure") return <Redirect href={`/(utils)/Error?errMsg=${data.result}`} />;
    await uploadImage(imageUri);

    router.push({ pathname: "/(tabs)/account" });
  }

  return (
    <>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      <ScrollView style={styles.container}>
        <Image resizeMode="cover" source={{ uri: imageUri }} style={styles.image} />
        {titleText && (
          <Animated.View style={[styles.nextButtonContainer, { top: animatedPosition }]}>
            <TouchableOpacity style={styles.nextButton} onPress={publishPost}>
              <Text style={styles.nextText}>Publier</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        <View style={styles.captionContainer}>
          <Text style={styles.captionTitle}>Titre :</Text>

          <TextInput
            ref={inputRef}
            placeholder="Ajoute un titre ici"
            style={styles.formInput}
            maxLength={50}
            multiline
            onChangeText={setTitleText}
            value={titleText}
          />
          <Text style={[styles.captionTitle, { marginTop: 20 }]}>Description (optionnel) :</Text>
          <TextInput
            placeholder="Ajoute une description ici"
            style={styles.formInput}
            maxLength={500}
            multiline
            numberOfLines={4}
            onChangeText={setDescText}
            value={descText}
          />
        </View>
      </ScrollView>
    </>
  );
}
