import React, { useEffect, useState } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { ThemeProvider as ElementsThemeProvider } from "react-native-elements";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AppProvider } from "@/context/appContext";
import Navigation from "@/components/navigation/Navigation";
import { useColorScheme } from "@/hooks/useColorScheme";

// Define your global theme for react-native-elements
const elementsTheme = {
  Input: {
    inputStyle: {
      fontSize: 14,
      fontFamily: "OpenSans",
      lineHeight: 30,
    },
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    OpenSans: require("../assets/fonts/OpenSans-Regular.ttf"),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      setLoading(false);
    }
  }, [loaded]);

  if (!loaded || loading) {
    return null;
  }

  return (
    <AppProvider>
      <NavigationThemeProvider
        value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <ElementsThemeProvider theme={elementsTheme}>
          <Navigation />
        </ElementsThemeProvider>
      </NavigationThemeProvider>
    </AppProvider>
  );
}
