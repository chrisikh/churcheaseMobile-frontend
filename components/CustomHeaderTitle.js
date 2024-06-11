import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useAppContext } from "../context/appContext";
import ProfileModal from "./ProfileModal.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "@/constants/MyColors";

const CustomHeaderTitle = () => {
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataJson = await AsyncStorage.getItem("userData");
        if (userDataJson !== null) {
          const userData = JSON.parse(userDataJson);
          setProfileImage(userData.mphoto);
        }
      } catch (error) {
        console.log("Error retrieving user data:", error);
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
    <View>
      <View style={styles.secondContainer}>
        <Text style={styles.textChurch}>Home</Text>
        <TouchableOpacity onPress={showProfileHandler} style={styles.moveOpa}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profilePhoto} />
          ) : (
            <Image
              source={require("../assets/images/blank2.png")}
              style={styles.profilePhoto}
            />
          )}
        </TouchableOpacity>
      </View>
      <ProfileModal show={profileModal} setShow={setProfileModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  secondContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
  },
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    paddingRight: 20,
  },

  textChurch: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
    color: "#fff",
  },
  moveOpa: {
    paddingRight: 20,
  },
});

export default CustomHeaderTitle;
