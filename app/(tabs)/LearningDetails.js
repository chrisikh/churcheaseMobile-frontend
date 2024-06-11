import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import Colors from "@/constants/MyColors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "@/context/appContext";

const LearningDetails = ({
  item = {
    description: "",
    title: "",
    forms: [],
  },
}) => {
  const navigation = useNavigation();
  const [modalVisible2, setModalVisible2] = useState(false);
  const { enrollForCourse, checkEnrollment, enrollmentData } = useAppContext();

  const handleClose = () => {
    setModalVisible2(false);
  };

  const route = useRoute();
  const routeItem = route.params?.item || item;
  const [userId, setUserId] = useState({});
  const [mFirstName, setMFirstName] = useState("");
  const [mLastName, setMLastName] = useState("");
  const [churchName, setChurchName] = useState("");
  const [courseNameData, setCourseNameData] = useState("");
  const [courseEnrolled, setCourseEnrolled] = useState(false);

  useEffect(() => {
    checkEnrollment(routeItem._id);
  }, []);

  useEffect(() => {
    if (enrollmentData && enrollmentData.course) {
      setCourseNameData(enrollmentData.course.name);
      setCourseEnrolled(enrollmentData.userIsEnrolled);
    }
  }, [enrollmentData]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataJson = await AsyncStorage.getItem("userData");
        if (userDataJson !== null) {
          const userData = JSON.parse(userDataJson);
          setUserId(userData.mid);
          setMFirstName(userData.mfirstName);
          setMLastName(userData.mlastName);
          setChurchName(userData.churchName);
        }
      } catch (error) {
        console.log("Error retrieving user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const submitForm = async () => {
    const myData = {
      mId: userId,
      courseId: routeItem._id,
      Type: "Enrolled",
      churchName: churchName,
      lessonsLength: routeItem.lessons.length || 0,
      courseName: routeItem.name,
      // lessons: routeItem.lessons,
    };

    try {
      await enrollForCourse(myData);
      console.log("Form submitted successfully");
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  const showModal = () => {
    setModalVisible2(true);
  };
  const isEnrolled =
    courseNameData === routeItem.name && courseEnrolled === true;

  const gotoCourse = (enrollmentData) => {
    navigation.navigate("MyLearnings", { enrollmentData });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Image
          source={{ uri: routeItem.image.Location }}
          style={styles.image}
        />
        <View style={styles.listel}>
          <Text style={styles.itemText}>{routeItem.name}</Text>
          <Text style={styles.itemText}>{routeItem.description}</Text>

          <View style={styles.yeux}>
            <Text style={styles.itemText3}>Number of Lessons:</Text>
            <Text style={styles.itemText}>{routeItem.lessons.length}</Text>
          </View>
        </View>
        {isEnrolled ? (
          <View style={styles.textView}>
            <TouchableOpacity style={styles.closeButton2} onPress={gotoCourse}>
              <Text style={styles.textStyle}>Continue Learning</Text>
            </TouchableOpacity>
            <Text>Already enrolled for this course</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.closeButton} onPress={showModal}>
            <Text style={styles.textStylex}>Start Learning</Text>
          </TouchableOpacity>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => setModalVisible2(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView2}>
            <Text style={styles.modalText}>Great!</Text>
            <Text style={styles.modalSubText}>
              You are about to enroll in this course
            </Text>
            <View style={styles.yeuxss}>
              <TouchableOpacity style={styles.closeButton} onPress={submitForm}>
                <Text style={styles.textStyle}>Enroll</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton2}
                onPress={handleClose}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default LearningDetails;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  itemText: {
    fontSize: 18,
    lineHeight: 30,
    fontFamily: "OpenSans",
  },
  container: {
    flexGrow: 1,
    padding: 16,
  },
  actionButton: {
    backgroundColor: Colors.primary,
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
  closeButton2: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: "100%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "OpenSans",
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  listel: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "white",
    marginBottom: 5,
  },
  yeux: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  yeuxss: {
    flexDirection: "column",
    width: "100%",
    gap: 10,
    alignItems: "center",
  },
  itemText3: {
    fontSize: 18,
    lineHeight: 30,
    fontFamily: "OpenSans",
    fontWeight: "bold",
    color: "#243060",
  },
  textView: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textStylex: {
    textAlign: "center",
    fontFamily: "OpenSans",
    fontSize: 16,
    color: "#f8f8f8",
  },
});
