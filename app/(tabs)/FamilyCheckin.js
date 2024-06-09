import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Input, ListItem, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppContext } from "@/context/appContext";
import { useNavigation } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";

const FamilyCheckin = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    anonymous: false,
  });
  const [selectedEvent, setSelectedEvent] = useState({
    id: "",
    title: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const { getEvents, events } = useAppContext();
  const [eventData, setEventData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const getData = events.map((item) => ({
        ...item,
        id: item._id, // Add `id` field derived from `_id`
      }));
      setEventData(getData);
    };

    fetchData();
  }, [events]);

  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectCategory = (id, title) => {
    setSelectedEvent({ id, title });
    setModalVisible(false);
    navigation.navigate("FamilyCheckinForm", { item: id });
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const toggleSwitch = () =>
    handleInputChange("anonymous", !formData.anonymous);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.familyChi}>
            <ThemedText type="subtitle" style={styles.familypadd}>
              Family Check-in instruction:
            </ThemedText>
            <ThemedText type="default" style={styles.familypadd}>
              We are glad you are here. Please check in to let us know you are
              here.
            </ThemedText>
            <ThemedText type="default" style={styles.familypadd}>
              1. <Text style={styles.innerSpan}>Select the event</Text>: From
              the event list, choose the event you want to check in to.
            </ThemedText>
            <ThemedText type="default" style={styles.familypadd}>
              2. <Text style={styles.innerSpan}>Select Name(s)</Text>: Select
              the names of the family members you are checking in.
            </ThemedText>
            <ThemedText type="default" style={styles.familypadd}>
              3. <Text style={styles.innerSpan}>Check In</Text>: Click the check
              in button to complete the process.
            </ThemedText>
          </View>

          <TouchableOpacity onPress={openModal}>
            <Input
              placeholder="Select event"
              label="Select an event to check in"
              value={selectedEvent.title}
              editable={false} // Makes the input non-editable
              rightIcon={{ type: "antdesign", name: "down" }}
            />
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Icon name="close" size={30} color="black" />
                </TouchableOpacity>
              </View>
              {eventData.map((item, index) => (
                <ListItem
                  key={index}
                  bottomDivider
                  onPress={() =>
                    handleSelectCategory(item._id, item.eventTitle)
                  }
                >
                  <ListItem.Content>
                    <ListItem.Title>{item.eventTitle}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start", // Ensures content starts from the top
    paddingTop: 60,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim the background
  },
  modalView: {
    height: "50%",
    backgroundColor: "white",
    alignContent: "center",
    padding: 20,
    marginTop: "auto",
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row", // Aligns items horizontally
    justifyContent: "flex-end", // Distributes space between children
  },

  closeButton: {
    // Optional: add specific styles for the close button if needed
  },

  formContainer: {
    padding: 20,
  },

  formheader: {
    marginBottom: 10,
    textAlign: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },

  familypadd: {
    paddingVertical: 10,
  },

  innerSpan: {
    fontWeight: "bold",
    color: "#243060",
  },

  familyChi: {
    marginBottom: 50,
  },
});

export default FamilyCheckin;
