import { type Colors } from "@/constants/colors";
import useContextSnippet from "@/hooks/useContextSnippet";
import createStyles from "@/styles/account.styles";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function AccountPage() {
  const { context, error } = useContextSnippet();
  if (error || !context) return <Redirect href={`/(utils)/Error?errMsg=${error}`} />;

  const { theme, getColors } = context;

  const colors = getColors() as Colors;
  const styles = createStyles(colors);

  const data = new Array(12).fill("https://air.io/storage/iaJwepTxtuzcGNj3b5eDmJXbhuQjC8sFAXignlOu.jpg");

  return (
    <>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.username}>BenjiReel</Text>
          <TouchableOpacity style={styles.menu}>
            <Ionicons name="menu-outline" size={30} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileContainer}>
          <Image source={require("@/assets/images/lol.avif")} style={styles.avatar} />
          <View style={styles.statsContainer}>
            <View>
              <Text style={styles.statValue}>7 764</Text>
              <Text style={styles.statLabel}>Publications</Text>
            </View>
            <View>
              <Text style={styles.statValue}>3,2 M</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View>
              <Text style={styles.statValue}>441</Text>
              <Text style={styles.statLabel}>Suivie(e)s</Text>
            </View>
          </View>
        </View>

        <View style={styles.bioContainer}>
          <Text style={styles.bioText}>
            Fashion, entertainment, art and design.{"\n"}
            VOLUME THREE: The Music Issue
          </Text>
          <Text style={styles.link}>likeshop.me/wmag</Text>
          <Text style={styles.location}>New York, New York</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.buttonText}>Modifier</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          contentContainerStyle={styles.gridContainer}
          data={data}
          numColumns={3}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push("/Post")}>
              <Image source={{ uri: item }} style={styles.gridItem} />
            </TouchableOpacity>
          )}
          scrollEnabled={false}
        />
      </ScrollView>
    </>
  );
}
