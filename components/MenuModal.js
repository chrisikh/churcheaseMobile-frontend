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
import LogoutButton from "./LogoutButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../context/appContext";
import MyColors from "../constants/MyColors";
import { useState } from "react";
import FellowshipModal from "./FellowshipModal";

const menuItems = [
  { id: "1", title: "Check In", icon: "file-sign", screen: "FamilyCheckin" },
  { id: "2", title: "Fellowship", icon: "hands-pray", screen: "Fellowship" },

  { id: "3", title: "Forms", icon: "book", screen: "Forms" },
  {
    id: "4",
    title: "Learning",
    icon: "laptop",
    screen: "LearningCenterScreen",
  },

  { id: "5", title: "Give", icon: "wallet", screen: "GiveScreen" },

  {
    id: "6",
    title: "Volunteer",
    icon: "account-check",
    screen: "SupportScreen",
  },

  // Add more items as needed
];

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

const MenuModal = () => {
  const navigation = useNavigation();
  const { logout } = useAppContext();
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
        onPress={() => handleItemFellowship(item)}
      >
        <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  const handleItemPress = (item) => {
    // Ensure modal is closed if necessary
    //setShow(false);
    if (item.title === "Fellowship") {
      handleFellowshipClose();
    } else {
      navigation.navigate(item.screen);
    }
  };

  const handleItemFellowship = (item) => {
    setShowFellowship(false);
    navigation.navigate(item.screen);
  };

  const [showFellowship, setShowFellowship] = useState(false);
  const handleFellowshipClose = () => {
    setShowFellowship(true);
  };

  const [show, setShow] = useState(false);
  return (
    <>
      <Modal visible={show} animationType="slide" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <View style={styles.spacer} />
              <Text style={styles.modalTitle}>Menu</Text>
              <TouchableOpacity
                onPress={() => setShow(false)}
                style={styles.closeButton}
              >
                <Icon name="close" size={30} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={menuItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={3}
              ListFooterComponent={<LogoutButton onLogout={logout} />}
            />
          </View>
        </View>
      </Modal>

      {/* <Modal visible={showFellowship} animationType="slide" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalViewFellow}>
            <View style={styles.modalHeader}>
              <View style={styles.spacer} />
              <Text style={styles.modalTitle}>Fellowship</Text>
              <TouchableOpacity
                onPress={() => setShowFellowship(false)}
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
      </Modal> */}
    </>
  );
};

export default MenuModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start", // Ensures content starts from the top
    paddingTop: 60,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim the background
  },
  modalView: {
    height: "100%",
    backgroundColor: "white",
    alignContent: "center",
    padding: 20,
    marginTop: "auto",
  },
  modalViewFellow: {
    height: "30%",
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    width: "100%",
  },
  itemText: {
    fontSize: 16,
  },
});
