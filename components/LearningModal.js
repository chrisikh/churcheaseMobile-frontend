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

const fellowItems = [
  {
    id: "1",
    title: "Learning Center",
    icon: "pen",
    screen: "LearningCenter",
  },
  { id: "2", title: "My Learnings", screen: "MyLearnings", icon: "note" },
  {
    id: "3",
    title: "Growth Planner",
    screen: "GrowthPlanner",
    icon: "chart-line",
  },
];

const LearningModal = ({ show, setShow }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleItemPress(item)}>
      <Icon name={item.icon} size={30} color={MyColors.primary} />
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderItemFellowship = ({ item }) => (
    <View style={styles.listItem}>
      <TouchableOpacity
        style={styles.listItemContainer}
        onPress={() => handleItemPress(item)}
      >
        <Icon name={item.icon} size={24} style={styles.icon} />
        <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  const handleItemPress = (item) => {
    // Ensure modal is closed if necessary
    setShow(false);

    navigation.navigate(item.screen);
  };

  const handleItemFellowship = (item) => {
    setShowFellowship(false);
    navigation.navigate(item.screen);
  };

  const [showFellowship, setShowFellowship] = useState(false);
  const handleFellowshipClose = () => {
    setShowFellowship(true);
  };

  return (
    <>
      <Modal visible={show} animationType="slide" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalViewFellow}>
            <View style={styles.modalHeader}>
              <View style={styles.spacer} />
              <Text style={styles.modalTitle}>Learning Center</Text>
              <TouchableOpacity
                onPress={() => setShow(false)}
                style={styles.closeButton}
              >
                <Icon name="close" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={fellowItems}
              renderItem={renderItemFellowship}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default LearningModal;

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
  },
  modalViewFellow: {
    height: "40%",
    backgroundColor: "white",
    alignContent: "center",
    padding: 20,
    marginTop: "auto",
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    //backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    minWidth: Dimensions.get("window").width / 3 - 30,
    minHeight: 100,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    fontFamily: "OpenSans",
  },

  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  spacer: {
    width: 10, // Same width as the close button padding to balance the header
  },

  listItemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    flexDirection: "row",
    gap: 15,
  },
  itemText: {
    fontSize: 16,
  },
});
