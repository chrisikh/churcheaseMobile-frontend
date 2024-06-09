import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import { useAppContext } from "@/context/appContext";
import AnnouncementDetailModal from "@/components/AnnouncementDetailModal";

const Announcements = ({ title, iconName, color }) => {
  const containerStyle = {
    ...styles.container,
    backgroundColor: color, // Dynamically set the background color
  };
  const { getAnnouncement, announcements } = useAppContext();

  const [announcement, setAnnouncement] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getAnnouncement();
  }, []);

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
    <SafeAreaView style={styles.safeArea}>
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
    </SafeAreaView>
  );
};

export default Announcements;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    paddingVertical: 20,
  },
  listContainer: {
    flexGrow: 1, // Ensures the list container grows to fill the space
  },
  listItemContainer: {
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",

    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: 150,
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
  },
  statusText: {
    fontSize: 14,
    color: "#666",
    textAlign: "left",
    fontFamily: "OpenSans",
  },
  datetext: {
    fontStyle: "italic",
    color: "#666",
    textAlign: "right",
    fontFamily: "OpenSans",
  },
});
