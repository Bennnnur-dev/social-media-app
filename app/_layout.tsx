import ContextWrapper from "@/components/ContextWrapper";
import { Colors } from "@/constants/colors";
import useContextSnippet from "@/hooks/useContextSnippet";
import { Redirect, SplashScreen, Stack } from "expo-router";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <ContextWrapper>
      <App />
    </ContextWrapper>
  );
}

function App() {
  const { context, error } = useContextSnippet();
  if (error || !context) return <Redirect href={`/(utils)/Error?errMsg=${error}`} />;

  SplashScreen.preventAutoHideAsync();

  const colors = context.getColors() as Colors;
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: colors.primary, paddingTop: Platform.OS === "android" ? 10 : 0 }}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(utils)/Error"
              options={{
                title: "Erreur",
                headerStyle: { backgroundColor: colors.primary },
                headerShadowVisible: false,
                headerTintColor: colors.text,
                headerTitleAlign: "center",
                headerBackButtonDisplayMode: "minimal",
              }}
            />
            <Stack.Screen
              name="(post)/Post"
              options={{
                title: "Publication",
                headerStyle: {
                  backgroundColor: colors.primary,
                },
                headerTintColor: colors.text,
                headerBackButtonDisplayMode: "minimal",
                headerTitleAlign: "center",
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen name="(post)/Edit" options={{ headerShown: false }} />
            <Stack.Screen
              name="(post)/FinalEdit"
              options={{
                title: "Modifier la publication",
                headerStyle: { backgroundColor: colors.primary },
                headerShadowVisible: false,
                headerTintColor: colors.text,
                headerTitleAlign: "center",
                headerBackButtonDisplayMode: "minimal",
              }}
            />
          </Stack>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
