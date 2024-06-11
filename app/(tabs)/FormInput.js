import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Button,
  Modal,
  LogBox,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import he from "he";
import RenderHtml from "react-native-render-html";
import { CheckBox, Input } from "react-native-elements";
import Colors from "@/constants/MyColors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "@/context/appContext";
LogBox.ignoreLogs(["Warning: TNodeChildrenRenderer: Support for defaultProps"]);

const FormInput = ({ item = { description: "", title: "", forms: [] } }) => {
  const [memberId, setMemberId] = useState("");
  const [modalVisible2, setModalVisible2] = useState(false);
  const { submitUserForm } = useAppContext();

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

  const route = useRoute();
  const { item: routeItem } = route.params || { item };

  const [formData, setFormData] = useState(routeItem.forms);

  const { width } = Dimensions.get("window");

  const decodedDescription = useMemo(
    () => he.decode(routeItem.description),
    [routeItem.description]
  );

  console.log("Description : ", decodedDescription);

  const handleTaskTextChange = (text, index) => {
    const newFormData = [...formData];
    newFormData[index].response = text;
    setFormData(newFormData);
  };

  const handleRadioChange = (index, option) => {
    const newFormData = [...formData];
    newFormData[index].response = option;
    setFormData(newFormData);
  };

  const handleCheckboxChange = (index, option) => {
    const newFormData = [...formData];
    if (!newFormData[index].response) {
      newFormData[index].response = [];
    }

    if (newFormData[index].response.includes(option)) {
      newFormData[index].response = newFormData[index].response.filter(
        (item) => item !== option
      );
    } else {
      newFormData[index].response.push(option);
    }

    setFormData(newFormData);
  };

  const submitForm = async () => {
    if (!memberId) {
      console.error("Member ID is not available");
      return;
    }

    const data = {
      formData,
      status: "Completed",
      planId: routeItem._id,
      memberId,
    };

    try {
      await submitUserForm(data);
      const clearedFormData = formData.map((form) => ({
        ...form,
        response: "",
      }));
      setFormData(clearedFormData);
      setModalVisible2(true);
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  const tagsStyles = {
    body: {
      lineHeight: 20,
    },
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {routeItem.forms && routeItem.forms.length > 0 ? (
        <>
          <View>
            <View style={styles.flexColumn}>
              <Text style={styles.title}>{routeItem.title}</Text>
              <RenderHtml
                contentWidth={width}
                source={{ html: decodedDescription }}
                tagsStyles={tagsStyles}
              />
              <View style={styles.separator} />
            </View>
          </View>
          <View>
            {formData && formData.length > 0 ? (
              formData.map((form, index) => (
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
              ))
            ) : (
              <Text style={styles.title}>{routeItem.title}</Text>
            )}
            <View style={styles.buttonContainer}>
              <Button
                title="Submit"
                onPress={submitForm}
                buttonStyle={styles.submitButton}
              />
            </View>
          </View>
        </>
      ) : (
        <Text style={styles.title}>{routeItem.title}</Text>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => setModalVisible2(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView2}>
            <Text style={styles.modalText}>Form Submitted</Text>
            <Text style={styles.modalSubText}>
              Thank you for your submission.
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
  );
};

export default FormInput;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
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
  buttonContainer: {
    alignItems: "center",
    marginTop: 40,
    justifyContent: "center",
  },
  submitButton: {
    backgroundColor: Colors.primary,
    width: 300,
    justifyContent: "center",
  },
  label: {
    fontWeight: "600",
    marginBottom: 8,
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
