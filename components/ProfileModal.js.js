import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  Linking,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../context/appContext";
import MyColors from "../constants/MyColors";
import LocalAuthentication from "react-native-local-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fellowItems = [
  // {
  //   id: "1",
  //   title: "Edit Profile",
  //   icon: "account-edit",
  //   screen: "EditProfile",
  // },
  {
    id: "2",
    title: "Change Password",
    icon: "lock-reset",
    screen: "ChangePassword",
  },
  // { id: "3", title: "Notifications", icon: "bell", screen: "Notification" },
  {
    id: "5",
    title: "Privacy Policy",
    icon: "file-document",
    externalLink: "https://churchease.com/privacy",
  },
  {
    id: "6",
    title: "Terms of Service",
    icon: "file-document-outline",
    externalLink: "https://churchease.com/terms",
  },
  {
    id: "8",
    title: "Logout",
    icon: "logout",
  },
  // {
  //   id: "7",
  //   title: "Sign in with Face ID",
  //   icon: "face-recognition",
  //   screen: "FaceID",
  // },
];

const ProfileModal = ({ show, setShow }) => {
  const navigation = useNavigation();
  const { logout } = useAppContext();

  const logoutUser = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userData");
    logout();
    navigation.navigate("AuthStack", { screen: "Login" });
  };

  const [mfirstName, setMfirstName] = useState("");
  const [churchName, setChurchName] = useState("");
  const [mlastName, setMlastName] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataJson = await AsyncStorage.getItem("userData");
        if (userDataJson !== null) {
          const userData = JSON.parse(userDataJson);
          //console.log("User data:", userData);
          setMfirstName(userData.mfirstName); // Assuming the first name is stored under the key 'firstName'
          setChurchName(userData.churchName);
          setMlastName(userData.mlastName);
          setProfileImage(userData.mphoto);
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItemContainer}
      onPress={() => handleItemPress(item)}
    >
      <Icon name={item.icon} size={24} style={styles.icon} />
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleItemPress = (item) => {
    setShow(false);

    if (item.externalLink) {
      Linking.canOpenURL(item.externalLink).then((supported) => {
        if (supported) {
          Linking.openURL(item.externalLink);
        } else {
          console.log("Don't know how to open URI: " + item.externalLink);
        }
      });
    } else if (item.screen === "FaceID") {
      handleFaceID();
    } else if (item.title === "Logout") {
      logoutUser();
      console.log("Logout");
    } else {
      navigation.navigate(item.screen);
    }
  };

  const handleFaceID = () => {
    LocalAuthentication.authenticate({
      reason: "Sign in with Face ID",
      fallbackToPasscode: true,
      suppressEnterPassword: true,
    })
      .then((success) => {
        Alert.alert("Authenticated Successfully");
      })
      .catch((error) => {
        Alert.alert("Authentication Failed", error.message);
      });
  };
  const handleProfilePress = () => {
    navigation.navigate("Profile");
  };

  return (
    <>
      <Modal visible={show} animationType="slide" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalViewFellow}>
            <View style={styles.modalHeader}>
              <View style={styles.spacer} />
              <Text style={styles.modalTitle}>Profile</Text>
              <TouchableOpacity
                onPress={() => setShow(false)}
                style={styles.closeButton}
              >
                <Icon name="close" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.profileContainer}
              onPress={handleProfilePress}
            >
              <View style={styles.floww}>
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    style={styles.profilePhoto}
                  />
                ) : (
                  <Image
                    source={require("../assets/images/blank2.png")}
                    style={styles.profilePhoto}
                  />
                )}
                <Icon name="chevron-right" size={30} color={MyColors.primary} />
              </View>
              <Text
                style={styles.userName}
              >{`${mfirstName} ${mlastName}`}</Text>
            </TouchableOpacity>
            <FlatList
              data={fellowItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
            <View>
              {churchName && (
                <Text style={styles.churchName}> {churchName}</Text>
              )}
            </View>
            <View style={styles.appVersionContainer}>
              <Text style={styles.appVersionText}>
                App Version: v1.0.0 (Build 100)
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start", // Ensures content starts from the top
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim the background
  },
  modalViewFellow: {
    height: "95%",
    backgroundColor: "white",
    alignContent: "center",
    padding: 20,
    marginTop: "auto",
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  profileContainer: {
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  appVersionContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  appVersionText: {
    fontSize: 14,
    color: "#888",
  },
  listItemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    marginLeft: 10,
  },
  floww: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  churchName: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    fontStyle: "bold",
    color: MyColors.primary,
  },
});
