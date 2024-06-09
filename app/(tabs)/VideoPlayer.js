// VideoPage.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Video } from "expo-av";
import { useAppContext } from "@/context/appContext";

import { BASE_URL } from "@/util/auth";
import axios from "axios";

const VideoPlayer = ({ route }) => {
  const { logout } = useAppContext();
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
        logout();
      }
      return Promise.reject(error);
    }
  );
  const { item } = route.params;
  console.log(item);
  return;
  const [completedVideos, setCompletedVideos] = useState({});
  const [currentVideo, setCurrentVideo] = useState(item.lessons[0]?._id);

  const [selectedVideoUri, setSelectedVideoUri] = useState(
    item.lessons[0]?.video[0]?.Location
  );
  console.log(item, "efwef");
  // const handlePlaybackStatusUpdate = (status, lessonId) => {
  //   if (status.didJustFinish && !status.isLooping) {
  //     setCompletedVideos((prevState) => ({
  //       ...prevState,
  //       [lessonId]: true,
  //     }));
  //   }
  // };

  const handlePlaybackStatusUpdate = async (status, lessonId) => {
    try {
      if (status.didJustFinish && !status.isLooping) {
        setCompletedVideos((prevState) => ({
          ...prevState,
          [lessonId]: true,
        }));

        const datax = {
          lessonId: lessonId,
          courseId: item.courseId,
        };

        // Send the completed lesson data to the backend
        const response = await fetch("/learning/lesson-completed", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lessonId }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Lesson completion status sent to backend:", data);
      }
    } catch (error) {
      console.error(
        "Error sending lesson completion status to backend:",
        error
      );
    }
  };

  const handleLessonPress = (lesson) => {
    setSelectedVideoUri(lesson.video.Location);
    setCurrentVideo(lesson._id);
  };

  useEffect(() => {
    if (selectedVideoUri) {
      const currentLesson = item.lessons.find(
        (lesson) => lesson.video.Location === selectedVideoUri
      );
      if (currentLesson) {
        setCurrentVideo(currentLesson._id);
      }
    }
  }, [selectedVideoUri]);

  const renderLessonItem = ({ item }) => (
    <TouchableOpacity
      style={styles.lessonItem}
      onPress={() => handleLessonPress(item)}
    >
      <View>
        <Image
          //source={{ uri: item.courseImage.Location }}
          style={styles.lessonThumbnail}
        />
      </View>
      <View style={styles.lessonDetails}>
        <Text style={styles.lessonTitle}>{item.title}</Text>
        {completedVideos[item._id] && (
          <Text style={styles.completedText}>Completed</Text>
        )}
        {currentVideo === item._id && (
          <Text style={styles.currentVideoText}>Currently Playing</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.courseTitle}>{item.courseName}</Text>
      {selectedVideoUri && (
        <Video
          source={{ uri: selectedVideoUri }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          isLooping={false}
          onPlaybackStatusUpdate={(status) =>
            handlePlaybackStatusUpdate(status, currentVideo)
          }
        />
      )}
      <FlatList
        data={item.lessons}
        renderItem={renderLessonItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  video: {
    width: "100%",
    height: 200,
    backgroundColor: "black",
  },
  listContainer: {
    paddingBottom: 16,
  },
  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
  },
  lessonThumbnail: {
    width: "30%",
    height: 100,
    marginRight: 16,
    borderRadius: 8,
  },
  lessonDetails: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  completedText: {
    marginTop: 5,
    color: "green",
  },
  currentVideoText: {
    marginTop: 5,
    color: "blue",
  },
});

export default VideoPlayer;
