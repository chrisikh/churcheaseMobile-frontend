import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AnnouncementDetailModal = ({ visible, onClose, announcement }) => {
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
            {/* <Icon name="close" size={24} color="#000" /> */}
            <Text style={styles.titlex}>Close</Text>
          </TouchableOpacity>
          {announcement && (
            <>
              <Image
                source={{ uri: announcement.annoucementImage.Location }}
                style={styles.image}
              />
              <View>
                <Text style={styles.title}>{announcement.annoucementName}</Text>
                <Text style={styles.description}>
                  {announcement.announcementDescription}
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AnnouncementDetailModal;

const styles = StyleSheet.create({
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
    height: "80%",
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
});
