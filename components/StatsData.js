import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import axios from "axios";

import { BASE_URL } from "@/util/auth";

const StatsData = () => {
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

  const [countCourse, setCountCourse] = useState(0);
  useEffect(() => {
    countCourses();
    countVolunteer();
  }, []);

  const countCourses = async () => {
    try {
      const response = await authFetch.get("/learning/count");
      setCountCourse(response.data.count);
    } catch (error) {
      console.error("Error counting courses:", error);
    }
  };

  const [countVolunteering, setCountVolunteering] = useState(0);
  const countVolunteer = async () => {
    try {
      const response = await authFetch.get("/volunteer/count");
      setCountVolunteering(response.data.count);
    } catch (error) {
      console.error("Error counting volunteering:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <View style={styles.statBox1}>
          <Text style={styles.statNumber}>{countVolunteering}</Text>
          <Text style={styles.statLabel}>Voln Opening</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{countCourse}</Text>
          <Text style={styles.statLabel}>Available Courses</Text>
        </View>
      </View>

      {/* <Text style={styles.singleStatLabel}>
        Last checked in for service on{" "}
        <Text style={styles.dateText}>May 17, 2024</Text>.
      </Text> */}
    </View>
  );
};

export default StatsData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  firstRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FE7064",
    marginHorizontal: 8,
    padding: 16,
    borderRadius: 8,
  },
  statBox1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FED970",
    marginHorizontal: 8,
    padding: 16,
    borderRadius: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "OpenSans",
  },
  statLabel: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "OpenSans",
  },
  singleBox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    padding: 16,
    borderRadius: 8,
  },
  singleStatNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "OpenSans",
  },
  singleStatLabel: {
    fontSize: 16,
    color: "#000",
    fontFamily: "OpenSans",
  },
  dateText: {
    fontWeight: "bold",
    color: "#000",
    fontStyle: "italic",
    fontFamily: "OpenSans",
  },
});
