import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  View,
} from "react-native";
import { Input, Button, ListItem, Text, Image } from "react-native-elements";
import { useAppContext } from "@/context/appContext";
import { useNavigation } from "@react-navigation/native";

const MyLearnings = () => {
  const navigation = useNavigation();
  const { getEnrolledCourses, enrolledcourses } = useAppContext();
  const [learningInfo, setLearningInfo] = useState([]);

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  const fetchData = async () => {
    const getData = enrolledcourses.enrolled.map((item) => ({
      ...item,
      id: item._id,
    }));

    setLearningInfo(getData);
  };

  useEffect(() => {
    fetchData();
  }, [enrolledcourses]);

  const renderItemFellowship = ({ item }) => (
    <TouchableOpacity
      style={styles.listItemContainer}
      onPress={() => videoPlayerlink(item)}
    >
      <Image source={{ uri: item.courseImage.Location }} style={styles.image} />

      <View>
        <Text style={styles.itemText}>{item.courseName}</Text>
        <Text style={styles.itemText2}>{item.lessonsLength}</Text>
      </View>
    </TouchableOpacity>
  );

  const videoPlayerlink = (item) => {
    navigation.navigate("VideoPlayer", { item });
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

  listItemContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    // borderBottomWidth: 1,
    // borderColor: "#ccc",
    backgroundColor: "white",
    marginBottom: 5,
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: "OpenSans",

    color: "#243060",
  },
  itemText2: {
    fontSize: 15,
    textAlign: "left",
    fontFamily: "OpenSans",
    color: "#243060",
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
    objectFit: "container",
    borderRadius: 10,
  },
  viewcls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
});

export default MyLearnings;
