import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from "react-native";
import { Input, Button, ListItem, Text, CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppContext } from "@/context/appContext";
import { validateCredentials } from "@/util/validatecredentials";
import { useNavigation } from "@react-navigation/native";
import Colors from "@/constants/MyColors";

const Testimony = () => {
  const { getCategoryTestimony, testimonyCategory, postTestimonyRequest } =
    useAppContext();
  const [testimonyCategories, setTestimonyCategories] = useState([]);
  const navigation = useNavigation();
  const [modalVisible2, setModalVisible2] = useState(false);

  useEffect(() => {
    getCategoryTestimony();
  }, []);
  //console.log(prayerCategory, "prayerCategddory");

  const transformedData = testimonyCategory.map((item) => ({
    ...item,
    label: item.categoryName,
    value: item.categoryName,
  }));

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    anonymous: false,
  });
  const [modalVisible, setModalVisible] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectCategory = (value) => {
    handleInputChange("category", value);
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const toggleSwitch = () =>
    handleInputChange("anonymous", !formData.anonymous);

  const submitTestimonyRequest = () => {
    validateCredentials(formData, "Testimony Request");

    const data = {
      ...formData,
      category: formData.category,
    };

    postTestimonyRequest(data);

    setFormData({
      name: "",
      description: "",
      category: "",
      anonymous: false,
    });
    //navigation.navigate("Livestream");
    setModalVisible2(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          {/* <ThemedText type="titlemini2" style={styles.formheader}>
            Share Testimony
          </ThemedText> */}
          <Input
            placeholder="Enter testimony subject"
            label="Subject"
            value={formData.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
          <Input
            placeholder="Enter testimony"
            label="Testimony"
            multiline
            numberOfLines={5}
            value={formData.description}
            onChangeText={(text) => handleInputChange("description", text)}
          />
          <TouchableOpacity onPress={openModal}>
            <Input
              placeholder="Select a category"
              label="Select Testimony Category"
              value={formData.category}
              editable={false} // Makes the input non-editable
              rightIcon={{ type: "antdesign", name: "down" }}
            />
          </TouchableOpacity>
          <View style={styles.switchContainer}>
            <Text>Make Testimony Anonymous</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#FE7064" }}
              thumbColor={formData.anonymous ? "#243060" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={formData.anonymous}
            />
          </View>
          <ThemedButton
            title="Submit Testimony"
            onPress={submitTestimonyRequest}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Icon name="close" size={30} color="black" />
                </TouchableOpacity>
              </View>
              {transformedData.map((item, index) => (
                <ListItem
                  key={index}
                  bottomDivider
                  onPress={() => handleSelectCategory(item.value)}
                >
                  <ListItem.Content>
                    <ListItem.Title>{item.label}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </View>
          </View>
        </Modal>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => setModalVisible2(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView2}>
            <Text style={styles.modalText}>Testimony Submitted</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start", // Ensures content starts from the top
    paddingTop: 60,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim the background
  },
  modalView: {
    height: "50%",
    backgroundColor: "white",
    alignContent: "center",
    padding: 20,
    marginTop: "auto",
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row", // Aligns items horizontally
    justifyContent: "flex-end", // Distributes space between children
  },

  closeButton: {
    // Optional: add specific styles for the close button if needed
  },

  formContainer: {
    padding: 20,
    paddingTop: 50,
  },

  formheader: {
    marginBottom: 30,
    textAlign: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
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

export default Testimony;
