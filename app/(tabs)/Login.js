import React, { useState } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  Image,
} from "react-native";
import { Input, Button } from "@rneui/themed";
import { useAppContext } from "@/context/appContext";
import { ThemedText } from "@/components/ThemedText";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemedButton } from "@/components/ThemedButton";
import logo from "@/assets/images/logo.png";
import { validateCredentials } from "@/util/validatecredentials";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login() {
  const navigation = useNavigation();
  const { setupUser, setIsAuthenticated } = useAppContext();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [enteredSubdomain, setEnteredSubdomain] = useState("testaccount");
  const [enteredEmail, setEnteredEmail] = useState("info@churchease.com");
  const [enteredPassword, setEnteredPassword] = useState("12345678");

  function emailInputHandler(email) {
    setEnteredEmail(email);
  }

  function passwordInputHandler(password) {
    setEnteredPassword(password);
  }

  function subdomainInputHandler(subdomain) {
    setEnteredSubdomain(subdomain);
  }

  function forgotHandler() {
    navigation.navigate("ForgotPassword");
  }

  function confirmInputHandler() {
    validateCredentials({
      enteredEmail,
      enteredPassword,
      enteredSubdomain,
    });

    if (!enteredPassword || !enteredEmail || !enteredSubdomain) {
      alert("Please provide email, password, and church domain.");
      return;
    }

    const currentUser = {
      email: enteredEmail,
      password: enteredPassword,
      churchDomainx: enteredSubdomain,
    };

    setupUser({
      currentUser,
      endPoint: "/auth/login",
      alertText: "Login Successful",
    })
      .then((response) => {
        navigation.navigate("AuthenticatedStack");
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.log("Error setting up user:", error);
        let errorMessage = "There was an error setting up the user.";
        if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
        alert(errorMessage);
        setIsAuthenticated(false);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.form}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <View style={styles.inner}>
          <Image source={logo} style={styles.logoimage} />

          <View style={styles.inputContainer}>
            <ThemedText
              type="titlemini"
              onPress={forgotHandler}
              style={styles.forgotpasswordx}
            >
              Login
            </ThemedText>
            <Input
              placeholder="Domain"
              leftIcon={<Icon name="domain" size={20} />}
              onChangeText={subdomainInputHandler}
              value={enteredSubdomain}
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Input
              placeholder="Email"
              leftIcon={<Icon name="account-outline" size={20} />}
              onChangeText={emailInputHandler}
              value={enteredEmail}
              autoCorrect={false}
              autoCapitalize="none"
            />

            <Input
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}
              leftIcon={<Icon name="lock" size={20} />}
              rightIcon={
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Icon
                    name={isPasswordVisible ? "eye-outline" : "eye"}
                    size={20}
                  />
                </TouchableOpacity>
              }
              onChangeText={passwordInputHandler}
              value={enteredPassword}
              autoCorrect={false}
              autoCapitalize="none"
            />

            <TouchableOpacity onPress={forgotHandler} style={styles.touchable}>
              <ThemedText type="link" style={styles.forgotpassword}>
                Forgot password?
              </ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <ThemedButton title="Login" onPress={confirmInputHandler} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
  },
  inner: {
    width: "80%",
  },
  inputContainer: {
    width: "100%",
  },
  forgotpassword: {
    marginBottom: 30,
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
    alignSelf: "center",
  },
});
