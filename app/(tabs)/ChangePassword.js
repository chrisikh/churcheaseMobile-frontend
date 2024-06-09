import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Input, Button } from "react-native-elements";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "@/constants/MyColors";
import { useAppContext } from "@/context/appContext";

import { BASE_URL } from "@/util/auth";

const ChangePasswordScreen = () => {
  const { logout } = useAppContext();
  const authFetch = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );
  const { updatePassword, passwordUpdateStatus } = useAppContext();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      Alert.alert("Error", "All fields are required");
      return false;
    }
    if (newPassword !== confirmNewPassword) {
      Alert.alert("Error", "New passwords do not match");
      return false;
    }
    return true;
  };

  const handleChangePassword = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const userDataJson = await AsyncStorage.getItem("userData");

      const userPassword = {
        currentPassword: currentPassword,
        newPassword: newPassword,
      };
      // updatePassword(userPassword);

      const response = await authFetch.patch(
        "/auth/updatepassword",
        userPassword
      );
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        Alert.alert("Success", "Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        Alert.alert("Error", "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      Alert.alert("Error", "Error changing password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.formContainer}>
            <Input
              placeholder="Current Password"
              label="Current Password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              style={styles.input}
            />
            <Input
              placeholder="New Password"
              label="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              style={styles.input}
            />
            <Input
              placeholder="Confirm New Password"
              label="Confirm New Password"
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              secureTextEntry
              style={styles.input}
            />
            <Button
              title="Change Password"
              onPress={handleChangePassword}
              loading={loading}
              buttonStyle={styles.submitButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  formContainer: {
    width: "100%",
    padding: 20,
  },
  submitButton: {
    backgroundColor: Colors.primary,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  input: {
    fontFamily: "OpenSans",
    fontSize: 16,
  },
});
