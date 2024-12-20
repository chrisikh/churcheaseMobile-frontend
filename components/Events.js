import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useAppContext } from "@/context/appContext";
import EventDetailModal from "@/components/EventDetailModal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Import images
import image1 from "@/assets//images/eef.jpg";
// Add more images as needed

const Events = ({ color }) => {
  const containerStyle = {
    ...styles.container,
    backgroundColor: color, // Dynamically set the background color
  };

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { getEvents, events } = useAppContext();
  const [eventData, setEventData] = useState([]);

  // Create an array of imported images
  const images = [image1];

  useEffect(() => {
    getEvents();
  }, []);

  const fetchData = async () => {
    const getData = events.map((item) => ({
      ...item,
      id: item._id, // Add `id` field derived from `_id`
    }));
    setEventData(getData);
  };

  useEffect(() => {
    fetchData();
  }, [events]);

  const renderItem = ({ item }) => {
    // Select a random image from the array
    const randomImage = images[Math.floor(Math.random() * images.length)];

    return (
      <TouchableOpacity
        style={styles.listItemContainer}
        onPress={() => handleItemPress(item)}
      >
        <ImageBackground
          source={randomImage}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <View
            style={[
              styles.overlay,
              { backgroundColor: `${item.eventLabel}80` }, // Dynamic background color with 50% opacity
            ]}
          >
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>{item.eventTitle}</Text>
              <Text style={styles.dateText}>{item.eventDay}</Text>
              <Icon name="calendar" size={50} style={styles.icon} />
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const handleItemPress = (item) => {
    setSelectedEvent(item);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={containerStyle}>
          <FlatList
            data={eventData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            initialNumToRender={2}
          />
          <EventDetailModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            eventData={selectedEvent}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Events;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
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
  },
  listContainer: {
    flexGrow: 1,
  },
  listItemContainer: {
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginBottom: 5,
  },
  textContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for text container

    paddingVertical: 30,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: "OpenSans",
    paddingBottom: 8,
    color: "#fff",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: "OpenSans",
    color: "#fff",
  },
  icon: {
    color: "#fff",
    paddingTop: 10,
  },
  imageStyle: {
    borderRadius: 10,
  },
  imageBackground: {
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden", // Ensures the borderRadius is applied
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 10,
  },
});
