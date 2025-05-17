import { Colors } from "@/constants/colors";
import useContextSnippet from "@/hooks/useContextSnippet";
import createStyles from "@/styles/dashboard.styles";
import { Redirect } from "expo-router";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const stories = [
  { id: "1", name: "Your Story", image: require("@/assets/images/services-thum.jpg") },
  { id: "2", name: "jaded.ele...", image: require("@/assets/images/lol.avif") },
  { id: "3", name: "pia.in.a.pod", image: require("@/assets/images/lol.avif") },
  { id: "4", name: "lil_wyatt838", image: require("@/assets/images/lol.avif") },
];

const posts = [
  {
    id: "1",
    user: "heaven.is.nevaeh",
    image: require("@/assets/images/services-thum.jpg"),
    caption: "Your favorite duo 💕",
    likes: ["kyia_kayaks"],
  },
  {
    id: "2",
    user: "heaven.is.nevaeh",
    image: require("@/assets/images/services-thum.jpg"),
    caption: "Your favorite duo 💕",
    likes: ["kyia_kayaks"],
  },
];

export default function Index() {
  const { context, error } = useContextSnippet();
  if (error) return <Redirect href={`/(utils)/Error?errMsg=${error}`} />;

  const colors = context?.getColors();
  const styles = createStyles(colors as Colors);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.logo}>Pour vous</Text>
        <View style={styles.headerIcons}>
          <Icon name="heart-outline" style={styles.icon} size={30} />
          <Icon name="send-outline" style={styles.icon} size={30} />
        </View>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={stories}
        keyExtractor={item => item.id}
        style={styles.stories}
        renderItem={({ item }) => (
          <View style={styles.storyItem}>
            <Image source={item.image} style={styles.storyImage} />
            <Text style={styles.storyName}>{item.name}</Text>
          </View>
        )}
      />

      {posts.map(post => (
        <View key={post.id} style={styles.postCard}>
          <View style={styles.postHeader}>
            <Image source={post.image} style={styles.profilePic} />
            <Text style={styles.username}>{post.user}</Text>
          </View>
          <Image source={post.image} style={styles.postImage} />
          <View style={styles.actionsRow}>
            <Icon name="heart-outline" style={styles.icon} size={25} />
            <Icon name="comment-outline" style={styles.icon} size={25} />
            <Icon name="send-outline" style={styles.icon} size={25} />
          </View>
          <Text style={styles.likes}>Liked by {post.likes[0]} and others</Text>
          <Text style={styles.caption}>
            <Text style={styles.username}>{post.user} </Text>
            {post.caption}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
