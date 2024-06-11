import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Input, Button, Text } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "@/context/appContext";
import Colors from "@/constants/MyColors";

const Profile = () => {
  const { updateUser, userResponse } = useAppContext();
  const [formData, setFormData] = useState({
    mfirstName: "",
    mlastName: "",
    memail: "",
    mmobilePhone: "",
    maddress: "",
    mcity: "",
    mstate: "",
    mpostal: "",
  });
  const [mid, setMid] = useState("");
  const [userData, setUserData] = useState(null);
  const [modalVisible2, setModalVisible2] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataJson = await AsyncStorage.getItem("userData");
        if (userDataJson !== null) {
          const userData = JSON.parse(userDataJson);
          setUserData(userData);
        }
      } catch (error) {
        console.log("Error retrieving user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      setFormData({
        mfirstName: userData.mfirstName || "",
        mlastName: userData.mlastName || "",
        memail: userData.memail || "",
        mmobilePhone: userData.mmobilePhone || "",
        maddress: userData.maddress || "",
        mcity: userData.mcity || "",
        mstate: userData.mstate || "",
        mpostal: userData.mpostal || "",
      });
      setMid(userData.mid || "");
    }
  }, [userData]);

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateUser(formData, mid);
      if (userResponse) {
        await AsyncStorage.setItem("userData", JSON.stringify(formData));
        setModalVisible2(true);
      }
    } catch (error) {
      console.log("Error saving user data:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.formContainer}>
          <Input
            placeholder="First Name"
            label="First Name"
            value={formData.mfirstName}
            onChangeText={(value) => handleInputChange("mfirstName", value)}
          />
          <Input
            placeholder="Last Name"
            label="Last Name"
            value={formData.mlastName}
            onChangeText={(value) => handleInputChange("mlastName", value)}
          />
          <Input
            placeholder="Email"
            label="Email"
            value={formData.memail}
            onChangeText={(value) => handleInputChange("memail", value)}
          />
          <Input
            placeholder="Phone"
            label="Phone"
            value={formData.mmobilePhone}
            onChangeText={(value) => handleInputChange("mmobilePhone", value)}
          />
          <Input
            placeholder="Address"
            label="Address"
            value={formData.maddress}
            onChangeText={(value) => handleInputChange("maddress", value)}
          />
          <Input
            placeholder="City"
            label="City"
            value={formData.mcity}
            onChangeText={(value) => handleInputChange("mcity", value)}
          />
          <Input
            placeholder="State"
            label="State"
            value={formData.mstate}
            onChangeText={(value) => handleInputChange("mstate", value)}
          />
          <Input
            placeholder="Zip Code"
            label="Zip Code"
            value={formData.mpostal}
            onChangeText={(value) => handleInputChange("mpostal", value)}
          />
          <Button
            title="Update"
            onPress={handleSave}
            style={styles.closeButton}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => setModalVisible2(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalView2}>
              <Text style={styles.modalText}>Update Successful!</Text>

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

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  formContainer: {
    width: "100%",
    padding: 20,
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
    borderRadius: 10,

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
