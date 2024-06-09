// VideoPage.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Video } from "expo-av";
import YoutubeIframe from "react-native-youtube-iframe";
import { useRoute } from "@react-navigation/native";
import { format } from "date-fns";
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "PP"); // Format as 'Month Day, Year at Hour:Minute AM/PM'
};

const WatchLivestream = () => {
  const route = useRoute();
  const { item } = route.params;

  const [link, setLink] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  useEffect(() => {
    if (item) {
      setLink(item.youtubeLink);
      setEventLink(item.eventTitle);
      setEventDescription(item.eventDescription);
    }
  }, [item]);

  const getYouTubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(link);
  const isYouTubeLink = !!videoId;
  return (
    <View style={styles.container}>
      {isYouTubeLink ? (
        <YoutubeIframe
          height={Dimensions.get("window").width / (16 / 9)}
          play={false}
          videoId={videoId}
        />
      ) : (
        <Video
          source={{ uri: link }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          isLooping={false}
        />
      )}
      <Text style={styles.courseTitle}>{eventLink}</Text>
      <View style={styles.settrd}>
        <Text style={styles.itemText3}>{formatDate(item.createdAt)}</Text>
      </View>
      <Text>{eventDescription}</Text>
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

    paddingTop: 16,
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

export default WatchLivestream;
