import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import * as Device from "expo-device";
import { useAppContext } from "@/context/appContext";

async function registerForPushNotificationsAsync() {
  const { user } = useAppContext();
  console.log("User:", user.notificationToken);
  //let token = user.notificationToken;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (finalStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    if (!token) {
      try {
        const projectId = "8745c92e-f6f7-4b26-b4fb-f549e14cb011";
        if (!projectId) {
          throw new Error("Project ID not found");
        }
        const response = await Notifications.getExpoPushTokenAsync({
          projectId,
        });
        token = response.data;
        console.log("New push token:", token);

        // Save token to AsyncStorage and user object
        // await AsyncStorage.setItem("notificationToken", token);
        // user.notificationToken = token;
      } catch (e) {
        console.error("Error getting Expo push token", e);
        token = `${e}`;
      }
    } else {
      console.log("Using existing push token:", token);
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        await Notifications.requestPermissionsAsync();
      }
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export default registerForPushNotificationsAsync;
