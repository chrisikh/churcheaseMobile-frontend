import React, { useState, useMemo, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useRoute } from "@react-navigation/native";
import he from "he";
import axios from "axios";
import { BASE_URL } from "@/util/auth";
import RenderHtml from "react-native-render-html";

const DevotionalDetails = ({
  item = {
    description: "",
    title: "",
  },
}) => {
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
      if (error.response?.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const route = useRoute();
  const routeItem = route.params?.item || item;
  const { width } = Dimensions.get("window");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const decodedDescription = useMemo(
    () => he.decode(description),
    [description]
  );

  useEffect(() => {
    if (routeItem._id) {
      getDevotionalById(routeItem._id);
    }
  }, [routeItem._id]);

  const getDevotionalById = async (id) => {
    try {
      const response = await authFetch.get(`/devotional/${id}`);
      if (response.status === 200 || response.status === 201) {
        setTitle(response.data.title);
        setDescription(response.data.description);
      }
    } catch (error) {
      console.error("Error fetching devotional:", error);
    }
  };

  const tagsStyles = {
    body: {
      lineHeight: 28, // Add your desired lineHeight
      fontSize: 16,
    },
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.listel}>
          <Text style={styles.title}>{title}</Text>

          <RenderHtml
            contentWidth={width}
            source={{ html: decodedDescription }}
            tagsStyles={tagsStyles}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default DevotionalDetails;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
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
  listel: {
    paddingVertical: 35,
    paddingHorizontal: 15,

    marginBottom: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "OpenSans",
    fontSize: 18,
  },
});
