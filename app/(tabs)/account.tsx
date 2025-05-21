import { type Colors } from "@/constants/colors";
import useContextSnippet from "@/hooks/useContextSnippet";
import createStyles from "@/styles/create.styles";
import { Redirect } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function AccountPage() {
  const { context, error } = useContextSnippet();
  if (error) return <Redirect href={`/(utils)/Error?errMsg=${error}`} />;

  const colors = context?.getColors() as Colors;
  const styles = createStyles(colors);

  return (
    <View>
      <Pressable onPress={() => context?.toggleTheme()}>
        <Text>Toggle theme</Text>
      </Pressable>
    </View>
  );
}
