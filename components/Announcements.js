import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Image,
} from "react-native";

import AnnouncementDetailModal from "./AnnouncementDetailModal";
import { useAppContext } from "../context/appContext";

const Announcements = ({ title, iconName, color }) => {
  const { getAnnouncement, announcements } = useAppContext();

  const [announcement, setAnnouncement] = useState([]);
  const [announcementsData, setAnnouncementsData] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getAnnouncement();
  }, []);

  // console.log(announcements, "announcements");

  const fetchData = async () => {
    const getData = announcements.map((item) => ({
      ...item,
      id: item._id, // Add `id` field derived from `_id`
    }));
    setAnnouncement(getData);
  };

  useEffect(() => {
    fetchData();
  }, [announcements]);

  const containerStyle = {
    ...styles.container,
    backgroundColor: color, // Dynamically set the background color
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.listItemContainer}
        onPress={() => handleItemPress(item)}
      >
        <Image
          source={{ uri: item.annoucementImage.Location }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.itemText}>{item.annoucementName}</Text>
          <Text style={styles.statusText}>{item.statusText}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleItemPress = (item) => {
    // Handle the item press event
    setSelectedAnnouncement(item);
    setModalVisible(true);
  };

  return (
    <View style={containerStyle}>
      <FlatList
        data={announcement}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        initialNumToRender={2}
      />
      <AnnouncementDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        announcement={selectedAnnouncement}
      />
    </View>
  );
};

export default Announcements;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "left",
    paddingBottom: 10,
  },
  title: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "OpenSans",
  },
  icon: {
    color: "#FE7064", // Change the color as needed
  },
  listContainer: {
    flexGrow: 1, // Ensures the list container grows to fill the space
  },
  listItemContainer: {
    //paddingVertical: 15,

    justifyContent: "flex-start",

    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  textContainer: {
    fontFamily: "OpenSans",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: "OpenSans",
    paddingBottom: 8,
    color: "#243060",
  },
  statusText: {
    fontSize: 14,
    color: "#666",
    textAlign: "left",
    fontFamily: "OpenSans",
    color: "#243060",
  },
});
