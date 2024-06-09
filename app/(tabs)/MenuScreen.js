import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import MyColors from "@/constants/MyColors";
import FellowshipModal from "@/components/FellowshipModal";
import SupportModal from "@/components/SupportModal";
import LearningModal from "@/components/LearningModal";
import VolunteerModal from "@/components/VolunteerModal";
import LivestreamModal from "@/components/LivestreamModal";

const menuItems = [
  { id: "1", title: "Check In", icon: "file-sign", screen: "FamilyCheckin" },
  { id: "2", title: "Fellowship", icon: "hands-pray", screen: "Fellowship" },
  { id: "3", title: "Forms", icon: "book", screen: "Forms" },
  { id: "4", title: "Learning", icon: "laptop", screen: "Learning" },
  { id: "5", title: "Devotional", icon: "cross", screen: "Devotional" },
  { id: "6", title: "Volunteer", icon: "account-check", screen: "Volunteer" },
  { id: "7", title: "Livestream", icon: "video", screen: "Livestream" },
];

const MenuScreen = () => {
  const navigation = useNavigation();
  const [showFellowship, setShowFellowship] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showVolunteer, setShowVolunteer] = useState(false);
  const [showLearning, setShowLearning] = useState(false);
  const [showLivestream, setShowLivestream] = useState(false);

  const handleItemPress = (item) => {
    if (item.title === "Fellowship") {
      setShowFellowship(true);
    } else if (item.title === "Support") {
      setShowSupport(true);
    } else if (item.title === "Learning") {
      setShowLearning(true);
    } else if (item.title === "Volunteer") {
      setShowVolunteer(true);
    } else if (item.title === "Livestream") {
      setShowLivestream(true);
    } else {
      navigation.navigate(item.screen);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleItemPress(item)}>
      <Icon name={item.icon} size={30} color={MyColors.primary} />
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.listContainer}
        />
      </View>
      <FellowshipModal show={showFellowship} setShow={setShowFellowship} />
      <SupportModal show={showSupport} setShow={setShowSupport} />
      <LearningModal show={showLearning} setShow={setShowLearning} />
      <VolunteerModal show={showVolunteer} setShow={setShowVolunteer} />
      <LivestreamModal show={showLivestream} setShow={setShowLivestream} />
    </>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  listContainer: {
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#f9f9f9",
    minWidth: Dimensions.get("window").width / 3 - 30,
    minHeight: 100,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    height: "100%",
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
    width: 10,
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
