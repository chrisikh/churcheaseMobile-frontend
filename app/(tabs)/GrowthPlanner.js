import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";

import { View, Text } from "react-native";
import { useAppContext } from "@/context/appContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { BASE_URL } from "@/util/auth";
import Colors from "@/constants/MyColors";

const GrowthPlanner = () => {
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

  const navigation = useNavigation();
  const { getGrowthPlanner, growthplannerdata = [] } = useAppContext();
  const [growthInfo, setGrowthInfo] = useState([]);
  const [savedPlan, setSavedPlan] = useState([]);

  useEffect(() => {
    getGrowthPlanner();
  }, []);

  useEffect(() => {
    getSavedGrowthPlanner();
  }, []);

  useEffect(() => {
    const initializeGrowthInfo = () => {
      const getData = growthplannerdata.map((item) => ({
        ...item,
        id: item._id,
        percentageCompleted: 0,
        status: "Not Started",
      }));
      setGrowthInfo(getData);
    };
    initializeGrowthInfo();
  }, [growthplannerdata]);

  useEffect(() => {
    if (growthInfo.length > 0 && savedPlan.length > 0) {
      const mergedData = growthInfo.map((item) => {
        const savedItem = savedPlan.find((saved) => saved.title === item.title);

        if (savedItem) {
          return {
            ...item,
            percentageCompleted: savedItem.percentageCompleted,
            status: savedItem.status,
          };
        }
        return item;
      });

      // Check if mergedData is actually different before setting state
      const hasChanged =
        JSON.stringify(mergedData) !== JSON.stringify(growthInfo);
      if (hasChanged) {
        // console.log("Merged data:", mergedData);
        setGrowthInfo(mergedData);
      }
    }
  }, [savedPlan, growthInfo]);

  const renderItemFellowship = ({ item }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case "In Progress":
          return "orange";
        case "Completed":
          return "green";
        case "Not Started":
          return "red";
        default:
          return "black";
      }
    };

    return (
      <TouchableOpacity
        style={styles.listItemContainer}
        onPress={() => handleItemFellowship(item)}
      >
        <Text style={styles.itemText}>{item.title}</Text>
        <View style={styles.settrd}>
          <Text
            style={[styles.itemText3, { color: getStatusColor(item.status) }]}
          >
            {item.status}
          </Text>
          <Text style={styles.itemText2}>
            {item.percentageCompleted.toFixed(2)}%
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // const handleItemFellowship = (item) => {
  //   navigation.navigate("GrowthPlannerInput", { item });
  // };

  const handleItemFellowship = (item) => {
    switch (item.status) {
      case "In Progress":
        navigation.navigate("GrowthPlannerInProgress", { item });
        break;
      case "Completed":
        navigation.navigate("GrowthPlannerCompleted", { item });
        break;
      case "Not Started":
        navigation.navigate("GrowthPlannerInput", { item });
        break;
      default:
        console.warn("Unknown status:", item.status);
        break;
    }
  };

  const getSavedGrowthPlanner = async () => {
    try {
      const response = await authFetch.get(`/learning/get-saved-growth`);

      if (response.status === 200) {
        const savedData = response.data;
        setSavedPlan(savedData);
      }
    } catch (error) {
      console.error("Error fetching saved planner:", error);
      Alert.alert("Error", "Failed to fetch saved planner");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={growthInfo}
        renderItem={renderItemFellowship}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    padding: 20,
  },
  listItemContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    marginBottom: 5,
  },
  itemText: {
    fontSize: 16,
  },
  settrd: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText2: {
    fontSize: 14,
  },
  itemText3: {
    fontSize: 14,
    color: Colors.secondary,
  },
});

export default GrowthPlanner;
