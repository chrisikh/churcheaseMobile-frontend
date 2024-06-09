import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "@/util/auth";
import {
  ScrollView,
  StyleSheet,
  Button,
  Alert,
  View,
  Text,
} from "react-native";
import { CheckBox } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FamilyCheckinForm = () => {
  const [mid, setMid] = useState("");
  const [family, setFamily] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState({});
  const [groupedFamilies, setGroupedFamilies] = useState({});
  const [event, setEvent] = useState({});
  const [checkinStatus, setCheckinStatus] = useState({});

  const route = useRoute();
  const { item } = route.params;

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
      if (error.response && error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async () => {
    try {
      const response = await authFetch.get(`/event/${item}`);
      setEvent(response.data);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataJson = await AsyncStorage.getItem("userData");
        if (userDataJson !== null) {
          const userData = JSON.parse(userDataJson);
          setMid(userData.mid);
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (mid) {
      getFamily();
    }
  }, [mid]);

  const getFamily = async () => {
    try {
      const response = await authFetch.get(`/user/${mid}`);
      setFamily(response.data);
    } catch (error) {
      console.error("Error fetching family:", error);
    }
  };

  useEffect(() => {
    if (family.length > 0) {
      const familyIds = family.map((member) => member._id);
      getCheckinStatus(familyIds);
    }
  }, [family]);

  const getCheckinStatus = async (familyIds) => {
    try {
      const response = await authFetch.get("/checkin/status", {
        params: { eventId: event._id, familyIds: familyIds.join(",") },
      });
      console.log(response.data);
      const status = response.data.checkins.reduce((acc, checkin) => {
        acc[checkin.mId] = true;
        return acc;
      }, {});
      setCheckinStatus(status);
    } catch (error) {
      console.error("Error fetching iuvbuiviu check-in status:", error);
    }
  };
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    if (checkinStatus) {
      setIsDisabled(true);
    }
  }, [checkinStatus]);

  useEffect(() => {
    const grouped = family.reduce((acc, member) => {
      const { familyId } = member;
      if (!acc[familyId]) {
        acc[familyId] = [];
      }
      acc[familyId].push(member);
      return acc;
    }, {});

    setGroupedFamilies(grouped);

    const initialSelection = {};
    family.forEach((member) => {
      initialSelection[member._id] = checkinStatus[member._id] || false;
    });
    setSelectedMembers(initialSelection);
  }, [family, checkinStatus]);

  const handleCheckboxChange = (memberId) => {
    setSelectedMembers((prevState) => ({
      ...prevState,
      [memberId]: !prevState[memberId],
    }));
  };

  const handleCheckIn = async () => {
    const selectedIds = Object.keys(selectedMembers).filter(
      (id) => selectedMembers[id]
    );
    if (selectedIds.length === 0) {
      Alert.alert(
        "No members selected",
        "Please select at least one member to check in."
      );
      return;
    }

    try {
      const checkInData = selectedIds.map((id) => ({
        userId: id,
        checkInTime: new Date(),
        fname: family.find((member) => member._id === id).mfirstName,
        lname: family.find((member) => member._id === id).mlastName,
        mId: family.find((member) => member._id === id)._id,
        selectedName: `${
          family.find((member) => member._id === id).mfirstName
        } ${family.find((member) => member._id === id).mlastName}`,
        eventTitle: event.eventTitle,
        event_id: event._id,
        eventId: event.eventId,
        eventDate: event.eventDate,
        familyId: family.find((member) => member._id === id).familyId,
      }));

      const response = await authFetch.post("/checkin", checkInData);
      const { checkins } = response.data;

      const alreadyCheckedIn = checkins.filter(
        (checkin) => checkin.alreadyCheckedIn
      ).length;
      const successfullyCheckedIn = checkins.filter(
        (checkin) => !checkin.alreadyCheckedIn
      ).length;

      if (successfullyCheckedIn > 0 && alreadyCheckedIn === 0) {
        Alert.alert(
          "Check-In Successful",
          "Selected members have been checked in."
        );
      } else if (successfullyCheckedIn > 0 && alreadyCheckedIn > 0) {
        Alert.alert(
          "Partial Check-In Successful",
          `Some members have been checked in. ${alreadyCheckedIn} member(s) were already checked in.`
        );
      } else {
        Alert.alert(
          "Check-In Not Needed",
          "All selected members are already checked in."
        );
      }
    } catch (error) {
      console.error("Error during check-in:", error);
      Alert.alert("Error", "An error occurred during check-in.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.keys(groupedFamilies).map((familyId) => (
        <View key={familyId} style={styles.familyContainer}>
          <Text style={styles.familypadd}>{event.eventTitle}</Text>
          {groupedFamilies[familyId].map((member) => (
            <CheckBox
              key={member._id}
              title={`${member.mlastName}, ${member.mfirstName}`}
              checked={selectedMembers[member._id]}
              disabled={isDisabled}
              onPress={() => handleCheckboxChange(member._id)}
            />
          ))}
        </View>
      ))}
      <Button title="Check In" onPress={handleCheckIn} />
    </ScrollView>
  );
};

export default FamilyCheckinForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  familyContainer: {
    marginBottom: 20,
  },
  familypadd: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
