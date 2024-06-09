import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import PrimaryButton from "./PrimaryButton";

const LogoutButton = ({ onLogout }) => {
  return (
    <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
      <PrimaryButton>Logout</PrimaryButton>
    </TouchableOpacity>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  logoutButtonText: {
    color: "white", // Text color
    fontSize: 16, // Adjust font size as needed
  },
});
