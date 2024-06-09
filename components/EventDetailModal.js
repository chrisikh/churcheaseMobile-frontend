import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const EventDetailModal = ({ visible, onClose, eventData }) => {
  const openLink = (link) => {
    console.log("Opening link:", link);
    const validLink =
      link.startsWith("http://") || link.startsWith("https://")
        ? link
        : `http://${link}`;
    Linking.canOpenURL(validLink)
      .then((supported) => {
        if (supported) {
          Linking.openURL(validLink);
        } else {
          console.log("Don't know how to open URI: " + validLink);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.titlex}>Close</Text>
          </TouchableOpacity>
          {eventData && (
            <>
              <View>
                <View
                  style={[
                    styles.statusText,
                    { backgroundColor: eventData.eventLabel },
                  ]}
                ></View>
                <Text style={styles.title}>{eventData.eventTitle}</Text>
                <Text style={styles.description}>
                  {eventData.eventDescription}
                </Text>
                <View style={styles.joinEvent}>
                  {eventData.eventLink ? (
                    <TouchableOpacity
                      onPress={() => openLink(eventData.eventLink)}
                    >
                      <Text style={styles.link}>Join Event</Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={styles.noLink}>No link available</Text>
                  )}
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default EventDetailModal;

const styles = StyleSheet.create({
  joinEvent: {
    marginTop: 30,
    marginBottom: 20,
    justifyContent: "center",
    flexDirection: "row",
  },
  link: {
    color: "#FE7064",
    fontSize: 16,
    fontFamily: "OpenSans",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",

    overflow: "scroll",
  },
  closeButton: {
    alignSelf: "flex-end",
    paddingBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },

  titlex: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "OpenSans",
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    fontFamily: "OpenSans",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    justifyContent: "flex-start",
    fontFamily: "OpenSans",
    fontWeight: "bold",
  },
  statusText: {
    width: "60",
    height: 5,
    marginBottom: 10,
  },
  noLink: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 10,
  },
});
