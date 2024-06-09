import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedButtonProps = {
  lightColor?: string;
  darkColor?: string;
  type?: "primary" | "secondary" | "success" | "danger";
  onPress: () => void;
  title: string;
  isLoading?: boolean;
};

export function ThemedButton({
  lightColor,
  darkColor,
  type = "primary",
  onPress,
  title,
  isLoading = false,
  ...rest
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.base,
        { backgroundColor },
        type === "primary" ? styles.primary : undefined,
        type === "secondary" ? styles.secondary : undefined,
        type === "success" ? styles.success : undefined,
        type === "danger" ? styles.danger : undefined,
        { width: "100%", borderRadius: 30 },
      ]}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color="#FFF" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 50, // Standard height for better touch area
  },
  text: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  primary: {
    backgroundColor: "#243060",
  },
  secondary: {
    backgroundColor: "#6c757d",
  },
  success: {
    backgroundColor: "#28a745",
  },
  danger: {
    backgroundColor: "#dc3545",
  },
});
