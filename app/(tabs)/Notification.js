import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { CheckBox, ListItem, Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Colors from "@/constants/MyColors";

const Notification = () => {
  const [notificationPreferences, setNotificationPreferences] = useState({
    dailyDevotionals: false,
    upcomingEvents: false,
    prayerRequests: false,
    announcements: false,
    volunteeringOpportunities: false,
    messages: false,
    courseReminders: false,
    givingUpdates: false,
  });

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotificationPreferences();
    fetchNotifications();
  }, []);

  const fetchNotificationPreferences = async () => {
    try {
      const storedPreferences = await AsyncStorage.getItem(
        "notificationPreferences"
      );
      if (storedPreferences) {
        setNotificationPreferences(JSON.parse(storedPreferences));
      }
    } catch (error) {
      console.log("Error fetching notification preferences:", error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "https://your-api-endpoint.com/api/notifications"
      );
      setNotifications(response.data);
    } catch (error) {
      console.log("Error fetching notifications:", error);
    }
  };

  const handlePreferenceChange = (type) => {
    setNotificationPreferences((prevPreferences) => ({
      ...prevPreferences,
      [type]: !prevPreferences[type],
    }));
  };

  const savePreferences = async () => {
    try {
      await AsyncStorage.setItem(
        "notificationPreferences",
        JSON.stringify(notificationPreferences)
      );
      alert("Preferences saved successfully!");
    } catch (error) {
      console.log("Error saving preferences:", error);
    }
  };

  const renderNotificationItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{item.body}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.formContainer}>
        {Object.keys(notificationPreferences).map((type) => (
          <CheckBox
            key={type}
            title={type.split(/(?=[A-Z])/).join(" ")}
            checked={notificationPreferences[type]}
            onPress={() => handlePreferenceChange(type)}
          />
        ))}
        <Button
          title="Save Preferences"
          style={styles.closeButton}
          onPress={savePreferences}
        />
      </View>
      {/* <View style={styles.notificationListContainer}>
        <Text style={styles.title}>Notifications</Text>
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
        />
      </View> */}
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  formContainer: {
    padding: 20,
  },
  notificationListContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: Colors.primary,
  },
});
