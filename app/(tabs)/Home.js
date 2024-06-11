import { useContext, useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Announcements from "@/components/Announcements";
import StatsData from "@/components/StatsData";
import Events from "@/components/Events";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import registerForPushNotificationsAsync from "@/util/Permissions";
import saveTokenToDatabase from "@/util/saveTokenToDatabase";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function Home(props) {
  const navigate = useNavigation();
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    console.log("useEffect triggered");

    registerForPushNotificationsAsync()
      .then((token) => {
        if (token) {
          saveTokenToDatabase(token, props.navigation);
          console.log("Notification token:", token);
        } else {
          console.log("Failed to get push token");
        }
      })
      .catch((error) => console.log("notification error : ", error));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response received:", response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const goToAnnouncements = () => {
    navigate.navigate("Announcements");
  };

  const goToEvents = () => {
    navigate.navigate("Events");
  };

  const data = [
    { key: "verse", type: "verse" },
    { key: "stats", type: "stats" },
    { key: "announcements", type: "announcements" },
    { key: "events", type: "events" },
  ];

  const renderItem = ({ item }) => {
    switch (item.type) {
      case "stats":
        return (
          <View>
            <StatsData />
          </View>
        );
      case "announcements":
        return (
          <View style={styles.pafss}>
            <ThemedText type="titlemini2" style={styles.define}>
              Announcements
            </ThemedText>
            <View style={styles.announcementContainer}>
              <Announcements
                title="Announcements"
                iconName="bullhorn"
                statusText="There are no upcoming events."
              />
            </View>
            <TouchableOpacity onPress={goToAnnouncements} style={styles.gotbut}>
              <Text style={styles.titlex}>View All</Text>
            </TouchableOpacity>
          </View>
        );
      case "events":
        return (
          <View style={styles.pafss}>
            <ThemedText type="titlemini2" style={styles.define}>
              Upcoming Events
            </ThemedText>
            <View style={styles.announcementContainer}>
              <Events
                title="Announcements"
                iconName="bullhorn"
                statusText="There are no upcoming events."
              />
            </View>
            <TouchableOpacity onPress={goToEvents} style={styles.gotbut}>
              <Text style={styles.titlex}>View All</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.scrollContainer}
      />
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignContent: "center",
  },
  scrollContainer: {
    padding: 16,
  },
  homeha: {
    marginBottom: 16,
    paddingHorizontal: 5,
    paddingVertical: 20,
  },
  define: {
    marginBottom: 8,
    fontFamily: "OpenSans",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 10,
    fontFamily: "OpenSans",
  },
  announcementContainer: {
    flex: 1,
  },
  pafss: {
    marginBottom: 16,
    paddingVertical: 20,
  },
  gotbut: {
    alignItems: "center",
    marginTop: 10,
  },
  titlex: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 10,
    fontFamily: "OpenSans",
    color: "#243060",
  },
});
