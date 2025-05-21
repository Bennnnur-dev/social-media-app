import { type TextData } from "@/app/Edit";
import useContextSnippet from "@/hooks/useContextSnippet";
import { Redirect } from "expo-router";
import { useMemo } from "react";
import { Dimensions, Text, TouchableOpacity } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

export default function CustomText(prop: { text: TextData }) {
  const { context, error } = useContextSnippet();
  if (error || !context) return <Redirect href={`/(utils)/Error?errMsg=${error}`} />;
  const { setIsEditingGlobal, setText } = context;
  const {
    text: { color, content, fontSize, boldIntensity, backgroundShown },
  } = prop;

  const { width } = Dimensions.get("window");

  const offset = useSharedValue({ x: 0, y: 0 });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value.x }, { translateY: offset.value.y }],
    };
  });

  const start = useSharedValue({ x: 0, y: 0 });
  const gesture = useMemo(() => {
    return Gesture.Pan()
      .onUpdate(e => {
        offset.value = {
          x: e.translationX + start.value.x,
          y: e.translationY + start.value.y,
        };
      })
      .onEnd(() => {
        start.value = {
          x: offset.value.x,
          y: offset.value.y,
        };
      });
  }, [offset]);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={animatedStyles}>
        <TouchableOpacity
          onPress={() => {
            setIsEditingGlobal(true);
            setText(prop.text);
          }}
        >
          <Text
            style={{
              color,
              fontSize: Number(fontSize),
              fontWeight: boldIntensity,
              textAlign: "center",
              backgroundColor: backgroundShown ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0)",
              paddingVertical: 10,
              paddingHorizontal: 60,
            }}
          >
            {content}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
}
