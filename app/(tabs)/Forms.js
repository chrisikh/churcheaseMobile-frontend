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

const Forms = () => {
  const navigation = useNavigation();
  const { getForm, formsData } = useAppContext();
  const [formInfo, setFormInfo] = useState([]);

  useEffect(() => {
    getForm();
  }, []);

  const fetchData = async () => {
    const getData = formsData.forms.map((item) => ({
      ...item,
      id: item._id,
    }));

    setFormInfo(getData);
  };

  useEffect(() => {
    fetchData();
  }, [formsData]);

  const renderItemFellowship = ({ item }) => (
    <TouchableOpacity
      style={styles.listItemContainer}
      onPress={() => handleItemFellowship(item)}
    >
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleItemFellowship = (item) => {
    navigation.navigate("FormInput", { item });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={formInfo}
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

export default Forms;
