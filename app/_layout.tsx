import ContextWrapper from "@/components/ContextWrapper";
import { Colors } from "@/constants/colors";
import useContextSnippet from "@/hooks/useContextSnippet";
import { Redirect, SplashScreen, Stack } from "expo-router";
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
  if (error) return <Redirect href={`/(utils)/Error?errMsg=${error}`} />;

  SplashScreen.preventAutoHideAsync();

  const colors = context?.getColors() as Colors;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(utils)/Error" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
