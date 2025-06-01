import { Colors } from "@/constants/colors";
import useContextSnippet from "@/hooks/useContextSnippet";
import createStyles from "@/styles/authStyles/login.styles";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const { context, error } = useContextSnippet();
  if (error || !context) return <Redirect href={`/(utils)/Error?errMsg=${error}`} />;

  const { theme, getColors } = context;

  const colors = getColors() as Colors;
  const styles = createStyles(colors);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  return (
    <>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Nom de profil"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Mot de passe"
            placeholderTextColor="#aaa"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            placeholder="Surnom (optionnel)"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
          />
        </View>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Créer un compte</Text>
        </TouchableOpacity>

        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.createButton} onPress={() => router.replace("/(auth)/Login")}>
            <Text style={styles.createButtonText}>Déjà un compte ?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
