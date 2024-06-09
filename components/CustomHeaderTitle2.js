import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
import { useAppContext } from "../context/appContext";
import MenuModal from "./MenuModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileModal from "./ProfileModal.js";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CustomHeaderTitle2 = ({ routeName }) => {
  const { user } = useAppContext();
  const [mfirstName, setMfirstName] = useState("");
  const [churchName, setChurchName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataJson = await AsyncStorage.getItem("userData");
        if (userDataJson !== null) {
          const userData = JSON.parse(userDataJson);
          setMfirstName(userData.mfirstName); // Assuming the first name is stored under the key 'firstName'
          setChurchName(userData.churchName);
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const [profileModal, setProfileModal] = useState(false);

  const imageSource = require("../assets/images/blank2.png");

  const showProfileHandler = () => {
    setProfileModal(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textChurch}>{routeName}</Text>

      <ProfileModal show={profileModal} setShow={setProfileModal} />

      {/* You can add more elements here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignContent: "center",
    width: "100%",
  },
  secondContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //paddingTop: Platform.OS === "ios" ? 10 : 0,
    width: "100%",
  },
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  textheader: {
    fontSize: 16,
    color: "#fff",
    // Customize your text style
  },

  textChurch: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",

    textAlign: "left",
    color: "#fff",
  },
});

export default CustomHeaderTitle2;
