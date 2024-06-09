import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Button, CheckBox } from "react-native-elements";
import axios from "axios";
import { BASE_URL } from "@/util/auth";
import Colors from "@/constants/MyColors";

const VolunteerList = () => {
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

  const route = useRoute();
  const { item } = route.params;
  const [schedule, setSchedule] = useState("");
  const [modalVisible2, setModalVisible2] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [volunteerSchedules, setVolunteerSchedules] = useState([]);
  const [scheduleDescription, setScheduleDescription] = useState(
    item.scheduleDescription
  );
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
    if (item) {
      setSkills(item.skillRequired);
      setVolunteerSchedules(item.volunteerSchedules);
      setSchedule(item.schedule);
      setTeamMembers(item.teamMembers);
      setStartDate(item.startDate);
    }
  }, [item]);

  const handlePositionSelect = (memberName, positionName) => {
    setSelectedPosition({ memberName, positionName });
  };

  const handleExpressInterest = async () => {
    if (!selectedPosition) {
      alert("Please select a position to apply for.");
      return;
    }

    const data = {
      positionName: selectedPosition.positionName,
      scheduleId: item._id,
      caseId: item._id,
      scheduleName: schedule,
      status: "Applied",
    };

    try {
      const response = await authFetch.post(`/volunteer/express`, data);

      if (response.status === 201 || response.status === 200) {
        setModalVisible2(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.groupvid}>
          <Text style={styles.header}>{schedule}</Text>
          <Text style={styles.itemText}>{scheduleDescription}</Text>
        </View>
        <View style={styles.groupvid}>
          <Text style={styles.header}>Start Date</Text>
          <Text style={styles.itemText}>{startDate}</Text>
        </View>
        <View style={styles.groupvid}>
          <Text style={styles.header}>Functional Area</Text>
          <FlatList
            data={teamMembers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <View style={styles.groupvid}>
                  <Text style={styles.itemText}>{item.memberName}</Text>
                </View>
                <View>
                  {item.positions.map((position, index) => (
                    <View key={index} style={styles.positionContainer}>
                      <CheckBox
                        title={position.positionName}
                        checked={
                          selectedPosition?.memberName === item.memberName &&
                          selectedPosition?.positionName ===
                            position.positionName
                        }
                        onPress={() =>
                          handlePositionSelect(
                            item.memberName,
                            position.positionName
                          )
                        }
                        checkedIcon="radio-button-checked"
                        uncheckedIcon="radio-button-unchecked"
                        iconType="material"
                      />
                      <View style={styles.positionDetails}>
                        <Text style={styles.subItemText}>
                          Number of Volunteers Required: {position.quantity}
                        </Text>
                        <Text style={styles.subItemText}>
                          Background Check Required:{" "}
                          {position.requireBackgroundCheck ? "Yes" : "No"}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          />
        </View>

        <View style={styles.groupvid}>
          <Text style={styles.header}>Skills Required</Text>
          <FlatList
            data={skills}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.itemText}>{item.value}</Text>
            )}
          />
        </View>

        <View style={styles.groupvid}>
          <Text style={styles.header}>Volunteer Schedule</Text>
          <FlatList
            data={volunteerSchedules}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.itemText}>
                {item.startTime} - {item.endTime}
              </Text>
            )}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleExpressInterest}
          >
            <Text style={styles.textStyle}>Express Interest</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => setModalVisible2(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalView2}>
              <Text style={styles.modalText}>Prayer Request Submitted</Text>
              <Text style={styles.modalSubText}>
                Thank you for your submission. We will keep you in our prayers.
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible2(false)}
              >
                <Text style={styles.textStyle}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VolunteerList;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
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
  scrollContainer: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
    lineHeight: 24,
  },
  itemText: {
    fontFamily: "OpenSans",
    fontSize: 16,
    lineHeight: 24,
    paddingBottom: 5,
  },
  subItemText: {
    fontFamily: "OpenSans",
    fontSize: 14,
    lineHeight: 22,
  },
  groupvid: {
    marginBottom: 20,
  },
  positionContainer: {
    marginBottom: 20,
  },
  positionDetails: {
    paddingLeft: 10,
  },
});
