import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../context/appContext";
import MyColors from "../constants/MyColors";
import { useState } from "react";
import { Input } from "react-native-elements";
import { ThemedButton } from "./ThemedButton";

const fellowItems = [
  {
    id: "1",
    title: "Prayer Request",
    icon: "file-sign",
    screen: "Prayer",
  },
  { id: "2", title: "Testimony", screen: "Testimony" },
  { id: "3", title: "My Prayer Requests", screen: "MyPrayerRequests" },
];

const SupportModal = ({ show, setShow }) => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    description: "",
  });

  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <>
      <Modal visible={show} animationType="slide" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalViewFellow}>
            <View style={styles.modalHeader}>
              <View style={styles.spacer} />

              <TouchableOpacity
                onPress={() => setShow(false)}
                style={styles.closeButton}
              >
                <Icon name="close" size={30} color="black" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Support</Text>
              <TouchableOpacity
                onPress={() => setShow(false)}
                style={styles.closeButton}
              >
                <Text style={{ fontSize: 18 }}>Send</Text>
              </TouchableOpacity>
            </View>
            <Input
              placeholder="Start typing here..."
              multiline
              numberOfLines={10}
              value={formData.description}
              onChangeText={(text) => handleInputChange("description", text)}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SupportModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start", // Ensures content starts from the top
  },

  modalViewFellow: {
    height: "100%",
    backgroundColor: "white",
    alignContent: "center",
    padding: 20,
    marginTop: "auto",
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 10,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "space-between",
    fontFamily: "OpenSans",
    width: "100%",
    textAlign: "center",
  },

  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  spacer: {
    width: 10, // Same width as the close button padding to balance the header
  },
});
