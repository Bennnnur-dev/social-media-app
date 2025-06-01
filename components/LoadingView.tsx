import { type Colors } from "@/constants/colors";
import useContextSnippet from "@/hooks/useContextSnippet";
import { BlurView } from "expo-blur";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import Animated, { useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";

type Prop = {
  loadingState: boolean;
  loadingMessage: string;
};

export default function LoadingView({ loadingState, loadingMessage }: Prop) {
  const { context, error } = useContextSnippet();
  if (error || !context) return <Redirect href={`/(utils)/Error?errMsg=${error}`} />;

  const colors = context.getColors() as Colors;
  const styles = createStyles(colors);

  const loadingAnimatedPositionX = useSharedValue(0);

  useEffect(() => {
    if (loadingState) {
      loadingAnimatedPositionX.value = withRepeat(
        withSequence(withTiming(-70, { duration: 700 }), withTiming(70, { duration: 700 })),
        -1,
        true
      );
    } else loadingAnimatedPositionX.value = 0;

    return () => {
      loadingAnimatedPositionX.value = 0;
    };
  }, [loadingState]);

  return (
    <BlurView style={styles.loadingBlur}>
      <Text style={styles.loadingText}>{loadingMessage}</Text>
      <Animated.View
        style={[styles.loadingAnim, { transform: [{ translateX: loadingAnimatedPositionX }] }]}
      ></Animated.View>
    </BlurView>
  );
}

function createStyles(colors: Colors) {
  const { height } = Dimensions.get("window");

  return StyleSheet.create({
    loadingBlur: {
      zIndex: 200,
      flex: 1,
      position: "absolute",
      height: "100%",
      width: "100%",
    },
    loadingText: {
      color: colors.text,
      marginHorizontal: "auto",
      top: height / 5,
      fontWeight: 600,
      fontSize: 20,
    },
    loadingAnim: {
      width: 50,
      height: 5,
      backgroundColor: colors.ternary,
      marginHorizontal: "auto",
      marginTop: height / 4.5,
    },
  });
}
