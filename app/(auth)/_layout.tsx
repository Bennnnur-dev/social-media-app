import { type Colors } from "@/constants/colors";
import useContextSnippet from "@/hooks/useContextSnippet";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { context, error } = useContextSnippet();
  if (error || !context) return <Redirect href={`/(utils)/Error?errMsg=${error}`} />;

  const colors = context.getColors() as Colors;
  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: "minimal",
        headerStyle: { backgroundColor: colors.primary },
        headerShadowVisible: false,
        headerTintColor: colors.text,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="Login" options={{ title: "Connection" }} />
      <Stack.Screen name="Register" options={{ title: "Créer un compte" }} />
    </Stack>
  );
}
