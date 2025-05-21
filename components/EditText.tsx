import { type BoldIntensity, type TextData } from "@/app/Edit";
import { type Colors } from "@/constants/colors";
import useContextSnippet from "@/hooks/useContextSnippet";
import createStyles from "@/styles/textEdit.styles";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Redirect } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import ColorPicker, { BrightnessSlider, Panel3 } from "reanimated-color-picker";

type Prop = {
  textsArray: TextData[];
  setTexts: React.Dispatch<React.SetStateAction<TextData[]>>;
};

export default function EditText({ textsArray, setTexts }: Prop) {
  const { context, error } = useContextSnippet();
  if (error || !context) return <Redirect href={`/(utils)/Error?errMsg=${error}`} />;

  const { text, setIsEditingGlobal, setText } = context;

  const colors = context.getColors() as Colors;
  const styles = createStyles(colors);

  const [boldIntensity, setBoldIntensity] = useState<BoldIntensity | undefined>(text?.boldIntensity);
  const [editedText, setEditedText] = useState(text?.content);
  const [isEditingColor, setIsEditingColor] = useState(false);
  const [isBackgroundShown, setIsBackgroundShown] = useState(text?.backgroundShown);

  const inputRef = useRef<TextInput>(null);
  const currentColor = useRef(text?.color);

  //focus to input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function handleBoldIntensity() {
    if (boldIntensity === 100) setBoldIntensity(400);
    else if (boldIntensity === 400) setBoldIntensity(700);
    else setBoldIntensity(100);
  }

  function setTextsArray() {
    const finalText: TextData = {
      content: editedText || "",
      color: currentColor.current || "rgb(255, 255, 255)",
      boldIntensity: boldIntensity || 400,
      fontSize: "25",
      backgroundShown: isBackgroundShown || true,
      id: text!.id,
    };
    const newTexts = textsArray.map(currentText => (currentText.id !== finalText.id ? currentText : finalText));
    setTexts(newTexts);
  }

  function deleteText() {
    const otherTexts = textsArray.filter(currentText => currentText.id !== text!.id);
    setTexts(otherTexts);
    setIsEditingGlobal(false);
  }

  return (
    <BlurView style={styles.container} tint="dark" intensity={50} experimentalBlurMethod="dimezisBlurView">
      {!isEditingColor ? (
        <>
          <View style={styles.textPreview}>
            <TextInput
              ref={inputRef}
              style={[styles.previewTextInput, { fontWeight: boldIntensity, color: currentColor.current }]}
              value={editedText}
              onChangeText={setEditedText}
              selectTextOnFocus
              onBlur={() => {
                //prevents exiting
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
              scrollEnabled
              multiline
              numberOfLines={6}
            />
          </View>

          <View style={styles.controls}>
            <TouchableOpacity
              style={[styles.colorCircle, { backgroundColor: currentColor.current }]}
              onPress={() => setIsEditingColor(true)}
            />
            <Pressable onPress={handleBoldIntensity} style={{ padding: 5 }}>
              <Text style={[styles.boldText, { fontWeight: boldIntensity }]}>B</Text>
            </Pressable>
            <Pressable onPress={() => setIsBackgroundShown(prev => !prev)}>
              <Ionicons
                name="image-outline"
                size={30}
                color={colors.text}
                style={{ opacity: isBackgroundShown ? 1 : 0.2 }}
              />
            </Pressable>
            <TouchableOpacity onPress={deleteText}>
              <Ionicons name="trash" size={30} color={colors.ternary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              setIsEditingGlobal(false);
              setTextsArray();
            }}
          >
            <Text style={styles.doneText}>Terminé</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={{ flex: 1, alignItems: "center" }}>
          <ColorPicker
            style={styles.colorPicker}
            value={text?.color}
            onChangeJS={({ rgb }) => {
              currentColor.current = rgb;
            }}
          >
            <Panel3 style={{ width: 250 }} />
            <BrightnessSlider style={{ marginTop: 20 }} />
          </ColorPicker>
          <TouchableOpacity
            style={{ position: "absolute", bottom: 300 }}
            onPress={() => {
              setIsEditingColor(false);
              //ensures it focuses after the text component was rendered
              setTimeout(() => {
                inputRef.current?.focus();
              }, 10);
            }}
          >
            <Text style={styles.doneText}>Terminé</Text>
          </TouchableOpacity>
        </View>
      )}
    </BlurView>
  );
}
