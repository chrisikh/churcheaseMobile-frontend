import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Text, Image } from "react-native-elements";
import { useAppContext } from "@/context/appContext";
import { useNavigation } from "@react-navigation/native";

const LearningCenter = () => {
  const navigation = useNavigation();
  const { getLearning, learning } = useAppContext();
  const [learningInfo, setLearningInfo] = useState([]);

  useEffect(() => {
    getLearning();
  }, []);

  const fetchData = async () => {
    const getData = learning.learning.map((item) => ({
      ...item,
      id: item._id,
    }));

    setLearningInfo(getData);
  };

  useEffect(() => {
    fetchData();
  }, [learning]);

  const renderItemFellowship = ({ item }) => (
    <TouchableOpacity
      style={styles.listItemContainer}
      onPress={() => handleItemFellowship(item)}
    >
      <Image source={{ uri: item.image.Location }} style={styles.image} />
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleItemFellowship = (item) => {
    navigation.navigate("LearningDetails", { item });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={learningInfo}
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
    // borderBottomWidth: 1,
    // borderColor: "#ccc",
    backgroundColor: "white",
    marginBottom: 5,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: "OpenSans",
    paddingBottom: 8,
    color: "#243060",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default LearningCenter;
