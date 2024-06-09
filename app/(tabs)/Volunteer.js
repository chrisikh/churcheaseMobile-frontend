import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Input, Button, ListItem, Text, CheckBox } from "react-native-elements";
import { useAppContext } from "@/context/appContext";
import { useNavigation } from "@react-navigation/native";

const Volunteer = () => {
  const navigation = useNavigation();
  const { getVolunteeer, volunteer } = useAppContext();
  const [volunteerInfo, setVolunteerInfo] = useState([]);

  useEffect(() => {
    getVolunteeer();
  }, []);

  const fetchData = async () => {
    const getData = volunteer.map((item) => ({
      ...item,
      id: item._id,
    }));

    setVolunteerInfo(getData);
  };

  useEffect(() => {
    fetchData();
  }, [volunteer]);

  const renderItemFellowship = ({ item }) => (
    <TouchableOpacity
      style={styles.listItemContainer}
      onPress={() => handleItemFellowship(item)}
    >
      <Text style={styles.itemText}>{item.schedule}</Text>
    </TouchableOpacity>
  );

  const handleItemFellowship = (item) => {
    navigation.navigate("VolunteerList", { item });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={volunteerInfo}
        renderItem={renderItemFellowship}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    padding: 20,
  },
  listItemContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    marginBottom: 5,
  },
  itemText: {
    fontSize: 16,
  },
});

export default Volunteer;
