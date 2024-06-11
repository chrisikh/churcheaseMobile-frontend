import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import he from "he";
import RenderHtml from "react-native-render-html";
import { Button, CheckBox, Input } from "react-native-elements";
import Colors from "@/constants/MyColors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "@/context/appContext";
import axios from "axios";

import { BASE_URL } from "@/util/auth";

const GrowthPlannerInput = () => {
  const authFetch = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
  const navigation = useNavigation();
  const [memberId, setMemberId] = useState("");
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { submitGrowthPlanner } = useAppContext();
  const [errorMessage, setErrorMessage] = useState("");
  const route = useRoute();
  const { item } = route.params;
  const [growthData, setGrowthData] = useState(
    item || { description: "", tasks: [], title: "" }
  );
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const { width } = Dimensions.get("window");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataJson = await AsyncStorage.getItem("userData");
        if (userDataJson !== null) {
          const userData = JSON.parse(userDataJson);
          setMemberId(userData.mid);
        }
      } catch (error) {
        console.log("Error retrieving user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const calculateCompletionPercentage = () => {
      let tasksWithResponse = 0;
      const totalTasks = growthData.tasks.length;

      growthData.tasks.forEach((task) => {
        if (task.response && task.response.trim() !== "") {
          tasksWithResponse += 1;
        }
      });

      return totalTasks > 0 ? (tasksWithResponse / totalTasks) * 100 : 0;
    };

    const percentage = calculateCompletionPercentage();
    setCompletionPercentage(percentage);
  }, [growthData.tasks]);

  const decodedDescription = useMemo(
    () => he.decode(growthData.description || ""),
    [growthData.description]
  );

  const handleTaskTextChange = (text, index) => {
    const newGrowthData = [...growthData.tasks];
    newGrowthData[index].response = text;
    setGrowthData({ ...growthData, tasks: newGrowthData });
  };

  const handleRadioChange = (index, option) => {
    const newGrowthData = [...growthData.tasks];
    newGrowthData[index].response = option;
    setGrowthData({ ...growthData, tasks: newGrowthData });
  };

  const handleCheckboxChange = (index, option) => {
    const newGrowthData = [...growthData.tasks];
    if (!newGrowthData[index].response) {
      newGrowthData[index].response = [];
    }

    if (newGrowthData[index].response.includes(option)) {
      newGrowthData[index].response = newGrowthData[index].response.filter(
        (item) => item !== option
      );
    } else {
      newGrowthData[index].response.push(option);
    }

    setGrowthData({ ...growthData, tasks: newGrowthData });
  };

  const submitForm = async () => {
    if (!memberId) {
      Alert.alert("Error", "Member ID is not available");
      return;
    }

    if (completionPercentage < 100) {
      Alert.alert(
        "Incomplete Form",
        "Please complete all tasks before submitting"
      );
      return;
    }

    const data = {
      growthData: growthData.tasks,
      status: "Completed",
      planId: item._id,
      memberId,
      percentageCompleted: completionPercentage,
      title: item.title,
      planId: item._id,
    };

    try {
      await submitGrowthPlanner(data);
      const clearedGrowthData = growthData.tasks.map((form) => ({
        ...form,
        response: "",
      }));
      setGrowthData({ ...growthData, tasks: clearedGrowthData });
      setModalVisible2(true);
    } catch (error) {
      console.log("Error submitting form:", error);
      Alert.alert(
        "Error",
        "There was an error submitting the form. Please try again."
      );
    }
  };

  const saveForm = async () => {
    const plannerToSave = {
      growthData: growthData.tasks,
      status: "In Progress",
      percentageCompleted: completionPercentage,
      memberId,
      title: item.title,
      planId: item._id,
    };

    try {
      const response = await authFetch.post(
        `/learning/save-growth-responses/${item._id}`,
        plannerToSave
      );
      // Alert.alert("Success", "Planner saved successfully");
      if (response.status === 201 || response.status === 200) {
        setModalVisible(true);
      } else {
        Alert.alert("Error", "Failed to save planner");
      }
    } catch (error) {
      console.log("Error saving planner:", error);
      Alert.alert("Error", "Failed to save planner");
    }
  };

  const goBackOne = () => {
    navigation.navigate("GrowthPlanner");
  };

  const tagsStyles = {
    body: {
      lineHeight: 30,
      fontSize: 16,
      fontFamily: "OpenSans",
    },
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {growthData.tasks.length > 0 ? (
        <View>
          <View style={styles.flexColumn}>
            <Text style={styles.title}>{growthData.title}</Text>
            <RenderHtml
              contentWidth={width}
              source={{ html: decodedDescription }}
              tagsStyles={tagsStyles}
            />
            <View style={styles.separator} />
          </View>
          <View>
            <Text style={styles.completionText}>
              Completion: {completionPercentage.toFixed(2)}%
            </Text>
            {growthData.tasks.map((form, index) => (
              <View key={index}>
                <Text style={styles.label}>
                  {form.order}. {form.question}
                </Text>
                {form.type === "text" && (
                  <Input
                    id={`taskInput-${index}`}
                    value={form.response || ""}
                    onChangeText={(text) => handleTaskTextChange(text, index)}
                    disabled={form.status === "Completed"}
                    required
                  />
                )}
                {form.type === "textarea" && (
                  <Input
                    id={`taskInput-${index}`}
                    multiline
                    numberOfLines={10}
                    value={form.response || ""}
                    onChangeText={(text) => handleTaskTextChange(text, index)}
                    disabled={form.status === "Completed"}
                    required
                  />
                )}
                {form.type === "radio" &&
                  form.options.map((option, optionIndex) => (
                    <CheckBox
                      key={`${index}-${optionIndex}`}
                      title={option}
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      checked={option === form.response}
                      onPress={() => handleRadioChange(index, option)}
                      disabled={form.status === "Completed"}
                    />
                  ))}
                {form.type === "checkbox" &&
                  form.options.map((option, optionIndex) => (
                    <CheckBox
                      key={`${index}-${optionIndex}`}
                      title={option}
                      checked={form.response?.includes(option)}
                      onPress={() => handleCheckboxChange(index, option)}
                      disabled={form.status === "Completed"}
                    />
                  ))}
              </View>
            ))}
            <View style={styles.buttonContainer}>
              <Button
                title="Save"
                onPress={saveForm}
                buttonStyle={styles.saveButton}
              />
              <Button
                title="Submit"
                onPress={submitForm}
                buttonStyle={styles.submitButton}
              />
            </View>
          </View>
        </View>
      ) : (
        <Text style={styles.title}>{item.title}</Text>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => setModalVisible2(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView2}>
            <Text style={styles.modalText}>Growth Planner Submitted</Text>
            <Text style={styles.modalSubText}>
              Growth Planner submitted successfully.
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView2}>
            <Text style={styles.modalText}>Planner Saved</Text>
            <Text style={styles.modalSubText}>
              Growth Planner saved successfully.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle} onPress={goBackOne}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

GrowthPlannerInput.defaultProps = {
  item: {
    description: "",
    title: "",
    forms: [],
  },
};

export default GrowthPlannerInput;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: "OpenSans",
  },
  itemText: {
    fontSize: 18,
  },
  container: {
    flexGrow: 1,
    padding: 16,
  },
  row: {
    height: 20,
  },
  flexColumn: {
    flexDirection: "column",
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 16,
  },
  completionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    fontFamily: "OpenSans",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 40,
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
    gap: 20,
  },
  saveButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 5,
    marginBottom: 10,
    width: 150,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    marginBottom: 10,
    width: 150,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView2: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  closeButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalSubText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  },
});
