import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from "react-native";
import { Input, Button, ListItem, Text, CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const Fellowship = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    anonymous: false,
  });
  const [modalVisible, setModalVisible] = useState(false);

  const categories = [
    { label: "Technology", value: "technology" },
    { label: "Business", value: "business" },
    { label: "Health", value: "health" },
  ];

  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectCategory = (value) => {
    handleInputChange("category", value);
    setModalVisible(false);
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
          <ThemedText type="titlemini2" style={styles.formheader}>
            Share Testimony
          </ThemedText>
          <Input
            placeholder="Enter testimony subject"
            label="Subject"
            value={formData.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
          <Input
            placeholder="Enter testimony"
            label="Testimony"
            multiline
            numberOfLines={5}
            value={formData.description}
            onChangeText={(text) => handleInputChange("description", text)}
          />
          <TouchableOpacity onPress={openModal}>
            <Input
              placeholder="Select a category"
              label="Select Testimony Category"
              value={formData.category}
              editable={false} // Makes the input non-editable
              rightIcon={{ type: "antdesign", name: "down" }}
            />
          </TouchableOpacity>
          <View style={styles.switchContainer}>
            <Text>Make Testimony Anonymous</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#FE7064" }}
              thumbColor={formData.anonymous ? "#243060" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={formData.anonymous}
            />
          </View>
          <ThemedButton
            title="Submit Testimony"
            onPress={() => console.log(formData)}
          />
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
              {categories.map((item, index) => (
                <ListItem
                  key={index}
                  bottomDivider
                  onPress={() => handleSelectCategory(item.value)}
                >
                  <ListItem.Content>
                    <ListItem.Title>{item.label}</ListItem.Title>
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
    marginBottom: 30,
    textAlign: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
});

export default Fellowship;
