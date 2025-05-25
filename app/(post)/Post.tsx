import { type Colors } from "@/constants/colors";
import useContextSnippet from "@/hooks/useContextSnippet";
import createStyles from "@/styles/post.styles";
import { Redirect } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function PostScreen() {
  const { context, error } = useContextSnippet();
  if (error || !context) return <Redirect href={`/(utils)/Error?errMsg=${error}`} />;

  const { getColors, isEditingGlobal, theme } = context;

  const colors = getColors() as Colors;
  const styles = createStyles(colors);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={require("@/assets/images/lol.avif")} style={styles.avatar} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>benjireel</Text>
          <Text style={styles.date}>24/05/2025</Text>
        </View>
        <TouchableOpacity style={styles.options}>
          <Text style={styles.dots}>⋯</Text>
        </TouchableOpacity>
      </View>

      <Image source={require("@/assets/images/KSP1.png")} style={styles.postImage} />

      <View style={styles.actions}>
        <TouchableOpacity>
          <Icon name="heart-outline" size={25} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="comment-outline" size={25} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="send-outline" size={25} color={colors.text} />
        </TouchableOpacity>
      </View>

      <Text style={styles.likes}>
        Aimé par <Text style={styles.bold}>samuelr2009</Text> et d'autres personnes
      </Text>
    </ScrollView>
  );
}
