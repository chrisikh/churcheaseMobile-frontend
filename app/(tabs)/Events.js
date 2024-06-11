import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { useAppContext } from "@/context/appContext";
import EventDetailModal from "@/components/EventDetailModal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import image1 from "@/assets/images/eef.jpg";

const Events = ({ color }) => {
  const containerStyle = {
    ...styles.container,
    backgroundColor: color, // Dynamically set the background color
  };

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { getEvents, events } = useAppContext();
  const [eventData, setEventData] = useState([]);
  const images = [image1];

  useEffect(() => {
    getEvents();
  }, []);

  const fetchData = async () => {
    if (events) {
      const getData = events.map((item) => ({
        ...item,
        id: item._id,
      }));
      setEventData(getData);
    }
  };

  useEffect(() => {
    fetchData();
  }, [events]);

  const renderItem = ({ item }) => {
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
    </SafeAreaView>
  );
};

export default Events;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 13,
  },
  listContainer: {
    flexGrow: 1, // Ensures the list container grows to fill the space
  },
  listItemContainer: {
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginBottom: 10,
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
  statusText: {
    paddingVertical: 30,
    paddingHorizontal: 10,
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
