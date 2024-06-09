import React, { useState } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Image,
} from "react-native";
import { Input, Button } from "@rneui/themed";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemedButton } from "@/components/ThemedButton";
import logo from "@/assets/images/logo.png";
import { useNavigation } from "@react-navigation/native";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  function backToLogin() {
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.form}
      >
        <Image source={logo} style={styles.logoimage} />

        <View style={styles.inputContainer}>
          <ThemedText type="titlemini" style={styles.forgotpasswordx}>
            Forgot password
          </ThemedText>

          <ThemedText
            type="default"
            style={{ paddingBottom: 20, textAlign: "center" }}
          >
            Enter your domain and email address below to receive a password
            reset link.
          </ThemedText>
          <Input
            placeholder="Domain"
            leftIcon={<Icon name="domain" size={20} />}
          />
          <Input
            placeholder="Email"
            leftIcon={<Icon name="account-outline" size={20} />}
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedButton title="Send link" />
        </View>

        <View style={styles.moveback}>
          <TouchableOpacity onPress={backToLogin} style={styles.touchable}>
            <Icon
              name="arrow-left"
              size={20}
              style={styles.forgotpasswordIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={backToLogin} style={styles.touchable}>
            <ThemedText type="link" style={styles.forgotpasswordText}>
              Back to Log in
            </ThemedText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    fontSize: 100,
    textAlign: "center",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  touchable: {
    flexDirection: "row",
    alignItems: "center",
  },
  forgotpasswordIcon: {
    marginRight: 10,
    color: "#FE7064", // Change this to your desired color
  },
  forgotpasswordText: {
    color: "#FE7064", // Change this to your desired color
  },
  inputContainer: {
    width: "80%",
  },
  forgotpassword: {
    marginBottom: 40,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    textAlign: "right",
    color: "#FE7064",
  },

  forgotpasswordx: {
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  logoimage: {
    width: 100,
    height: 100,
    marginBottom: 80,
  },
  moveback: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
