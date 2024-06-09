import React, { useState, useEffect } from "react";
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
import { useAppContext } from "@/context/appContext";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemedButton } from "@/components/ThemedButton";
import logo from "@/assets/images/logo.png";
import { router } from "expo-router";
import { validateCredentials } from "@/util/validatecredentials";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  const { setupUser, setIsAuthenticated } = useAppContext();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredSubdomain, setEnteredSubdomain] = useState("");

  function emailInputHandler(email: string) {
    setEnteredEmail(email);
  }

  function passwordInputHandler(password: string) {
    setEnteredPassword(password);
  }

  //   interface AppContextType {
  //     isAuthenticated: boolean;
  //     setIsAuthenticated: () => void;
  //     setupUser: (user: any) => void; // Add this line
  //   }

  function subdomainInputHandler(subdomain: string) {
    setEnteredSubdomain(subdomain);
  }

  function forgotHandler() {
    navigation.navigate("ForgotPassword");
  }

  const [isMember] = useState(true);
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
        // Handle successful response here
        //console.log("User setup successfully:", response);
        navigation.navigate("Home");
        setIsAuthenticated(true);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error setting up user:", error);
        let errorMessage = "There was an error setting up the user.";
        if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
        alert(errorMessage);
        setIsAuthenticated(false); // Revert authentication state if setup fails
      });
  }

  // const forgotHandler = () => {
  //   router.push("/forgotPassword");
  // };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.form}
      >
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

          {/* <View>
            <Input
              placeholder="Password"
              secureTextEntry={true}
              leftIcon={<Icon name="lock" size={20} />}
              onChangeText={passwordInputHandler}
              value={enteredPassword}
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View> */}
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

  inputContainer: {
    width: "80%",
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
  },
});
