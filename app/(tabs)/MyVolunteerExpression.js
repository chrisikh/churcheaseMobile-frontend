import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  View,
  Modal,
} from "react-native";
import { Text } from "react-native-elements";
import axios from "axios";
import { BASE_URL } from "@/util/auth";
import Colors from "@/constants/MyColors";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const MyVolunteerExpression = () => {
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

  const [schedules, setSchedules] = useState([]);
  const [scheduleInfo, setScheduleInfo] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    getExpressionInterest();
  }, []);

  useEffect(() => {
    fetchData();
  }, [schedules]);

  const getExpressionInterest = async () => {
    try {
      const { data } = await authFetch.get("/volunteer/express");
      setSchedules(data);
    } catch (error) {
      console.error("Error fetching expression of interest:", error);
      logoutUser();
    }
  };

  const fetchData = () => {
    const getData = schedules.map((item) => ({
      ...item,
      id: item._id,
    }));
    setScheduleInfo(getData);
  };

  const handleItemFellowship = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const renderItemFellowship = ({ item }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case "Applied":
          return "orange";
        case "In Progress":
          return "blue";
        case "Approved":
          return "green";
        default:
          return "black";
      }
    };

    return (
      <TouchableOpacity
        style={styles.listItemContainer}
        onPress={() => handleItemFellowship(item)}
      >
        <Text style={styles.itemText}>{item.scheduleName}</Text>
        <View style={styles.settrd}>
          <Text
            style={[styles.itemText2, { color: getStatusColor(item.status) }]}
          >
            {item.status}
          </Text>
          <Text style={styles.itemText3}>{item.positionName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={scheduleInfo}
        renderItem={renderItemFellowship}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView2}>
            <Text style={styles.modalText}>Interest Expressed</Text>
            {selectedItem && (
              <Text style={styles.modalSubText}>
                You expressed interest for the {selectedItem.positionName}{" "}
                volunteer opportunity on{" "}
                {moment(selectedItem.postDate).format("MMMM Do YYYY")}.
              </Text>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  settrd: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText2: {
    fontSize: 14,
  },
  itemText3: {
    fontSize: 14,
    color: Colors.secondary,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView2: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "OpenSans",
  },
  modalSubText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "OpenSans",
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: "100%",
    backgroundColor: Colors.primary,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "OpenSans",
    fontSize: 16,
  },
});

export default MyVolunteerExpression;
