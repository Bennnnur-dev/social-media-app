import ContextWrapper from "@/components/ContextWrapper";
import { Colors } from "@/constants/colors";
import useContextSnippet from "@/hooks/useContextSnippet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Redirect, SplashScreen, Stack } from "expo-router";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const queryClient = new QueryClient();
  return (
    <ContextWrapper>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
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
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: colors.primary },
              headerShadowVisible: false,
              headerTintColor: colors.text,
              headerTitleAlign: "center",
              headerBackButtonDisplayMode: "minimal",
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(utils)/Error"
              options={{
                title: "Erreur",
              }}
            />
            <Stack.Screen
              name="(post)/Post"
              options={{
                title: "Publication",
              }}
            />
            <Stack.Screen name="(post)/Edit" options={{ headerShown: false }} />
            <Stack.Screen
              name="(post)/FinalEdit"
              options={{
                title: "Modifier la publication",
              }}
            />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
