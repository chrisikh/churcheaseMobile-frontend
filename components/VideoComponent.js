import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Video } from "expo-av";
import YoutubeIframe from "react-native-youtube-iframe";

const VideoComponent = ({ link }) => {
  // Function to check if the link is a YouTube URL and extract the video ID
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
      {!isYouTubeLink && !link && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Invalid video URL</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width / (16 / 9),
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default VideoComponent;
