import React, { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "@/util/auth";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import Colors from "@/constants/MyColors";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "PP"); // Format as 'Month Day, Year at Hour:Minute AM/PM'
};

const StreamedServices = () => {
  const authFetch = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  authFetch.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
  const navigation = useNavigation();
  const [livestream, setLivestream] = useState([]);
  const [livestreamData, setLivestreamData] = useState([]);

  useEffect(() => {
    getLivestream();
  }, []);

  const getLivestream = async () => {
    try {
      const response = await authFetch.get("/livestream/recent/data");

      if (response.status === 200 || response.status === 201) {
        setLivestream(response.data);
      }
    } catch (error) {
      console.log("Error fetching livestream:", error);
    }
  };

  const fetchLivestream = async () => {
    const getLivestream = livestream.map((item) => ({
      ...item,
      id: item._id,
    }));

    setLivestreamData(getLivestream);
  };

  useEffect(() => {
    fetchLivestream();
  }, [livestream]);

  const renderLivestreamData = ({ item }) => (
    <TouchableOpacity
      style={styles.listItemContainer}
      onPress={() => handleItemDevotional(item)}
    >
      <Text style={styles.itemText}>{item.title}</Text>

      <View style={styles.settrd}>
        <Text style={styles.itemText3}>{formatDate(item.createdAt)}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleItemDevotional = (item) => {
    navigation.navigate("WatchStreamedService", { item });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={livestreamData}
        renderItem={renderLivestreamData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default StreamedServices;

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
    fontFamily: "OpenSans",
  },
  itemText3: {
    fontSize: 13,
    color: Colors.secondary,
    fontFamily: "OpenSans",
    fontStyle: "italic",
  },
});
