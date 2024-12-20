import { Text, type TextProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "titlemini"
    | "defaultSemiBold"
    | "subtitle"
    | "subtitle2"
    | "titlemini2"
    | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default", // Default parameter
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" && styles.default,
        type === "title" && styles.title,
        type === "defaultSemiBold" && styles.defaultSemiBold,
        type === "subtitle" && styles.subtitle,
        type === "subtitle2" && styles.subtitle2,
        type === "link" && styles.link,
        type === "titlemini" && styles.titlemini,
        type === "titlemini2" && styles.titlemini2,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    color: "#243060",
    fontFamily: "OpenSans",
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: "OpenSans",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
    color: "#243060",
    fontFamily: "OpenSans",
  },
  titlemini: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#243060",
    fontFamily: "OpenSans",
  },
  titlemini2: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#243060",
    fontFamily: "OpenSans",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#243060",
    fontFamily: "OpenSans",
  },
  subtitle2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#243060",
    fontFamily: "OpenSans",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#243060",
    fontFamily: "OpenSans",
  },
});
