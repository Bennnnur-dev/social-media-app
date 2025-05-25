import { type Colors } from "@/constants/colors";
import useAsyncStorage from "@/hooks/useAsyncStorage";
import useContextSnippet from "@/hooks/useContextSnippet";
import useImageUpload from "@/hooks/useImageUpload";
import createStyles from "@/styles/create.styles";
import { Ionicons } from "@expo/vector-icons";
import { ImagePickerAsset } from "expo-image-picker";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function ImageDropdownScreen() {
  const { context, error } = useContextSnippet();
  if (error || !context) return <Redirect href={`/(utils)/Error?errMsg=${error}`} />;

  const { theme, getColors } = context;

  const colors = getColors() as Colors;
  const styles = createStyles(colors);

  const { setAsyncStorage, getAsyncStorage } = useAsyncStorage();

  const [images, setImages] = useState<ImagePickerAsset[] | null>(null);
  const [focusedImage, setFocusedImage] = useState<ImagePickerAsset | null>(null);
  const focusedChildImage = useRef<number | null>(null);

  useEffect(() => {
    getAsyncStorage("SELECTED_PHOTOS").then(data => {
      if (data.status === "failure" || typeof data.result === "string")
        return Alert.alert("Erreur :(", data.result as string);
      setImages(data.result);
    });
  }, []);

  async function pickImages() {
    const images = await useImageUpload();
    if (images.status === "failure" || typeof images.result === "string") {
      return Alert.alert("Erreur :(", images.result as string);
    }
    setImages(images.result);
    setAsyncStorage("SELECTED_PHOTOS", images.result);
  }

  function setMainImage(image: ImagePickerAsset, index: number) {
    setFocusedImage(image);
    focusedChildImage.current = index;
  }

  return (
    <>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push("/")}>
            <Ionicons name="close" size={28} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Nouvelle publication</Text>
          <TouchableOpacity
            onPress={() => {
              if (!focusedImage) return;
              // router.push(`/Edit?imgData=${JSON.stringify(focusedImage)}`);
              router.push({ pathname: "/Edit", params: { imgData: JSON.stringify(focusedImage) } });
            }}
          >
            <Text style={[styles.nextText, !focusedImage && { opacity: 0.5 }]}>Suivant</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.previewContainer}>
          <Image source={{ uri: focusedImage?.uri }} style={styles.previewImage} resizeMode="contain" />
        </View>

        <View style={styles.bottomSheet}>
          <View style={styles.row}>
            <Text style={styles.label}>Récents</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.infoText}>Vous avez autorisé InstaWish à partager votre gallerie.</Text>
            <Text style={styles.label} onPress={pickImages}>
              Gérer
            </Text>
          </View>

          <FlatList
            data={images}
            horizontal={false}
            numColumns={3}
            keyExtractor={item => item.uri}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={styles.imageWrapper} onPress={() => setMainImage(item, index)}>
                {images?.length && images?.length > 0 && (
                  <Image
                    source={{ uri: item.uri }}
                    style={[styles.galleryImage, focusedChildImage.current === index && styles.focused]}
                  />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </>
  );
}
