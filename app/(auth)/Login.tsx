import { Colors } from "@/constants/colors";
import useContextSnippet from "@/hooks/useContextSnippet";
import createStyles from "@/styles/authStyles/login.styles";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const { context, error } = useContextSnippet();
  if (error || !context) return <Redirect href={`/(utils)/Error?errMsg=${error}`} />;

  const { theme, getColors } = context;

  const colors = getColors() as Colors;
  const styles = createStyles(colors);

  return (
    <>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Nom de profil" placeholderTextColor="#aaa" style={styles.input} />
          <TextInput placeholder="Mot de passe" placeholderTextColor="#aaa" secureTextEntry style={styles.input} />
        </View>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
        </TouchableOpacity>

        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.createButton} onPress={() => router.replace("/(auth)/Register")}>
            <Text style={styles.createButtonText}>Créer un compte</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
