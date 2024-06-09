import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const DashboardItem = ({ number, title, iconName, statusText, color }) => {
  const containerStyle = {
    ...styles.container,
    backgroundColor: color, // Dynamically set the background color
  };
  return (
    <View style={containerStyle}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Icon name={iconName} size={24} style={styles.icon} />
      </View>
      <View style={styles.bottomBody}>
        {number ? (
          // Container for number and icon with space-between
          <View style={styles.rowSpaceBetween}>
            <Text style={styles.number}>{number}</Text>
            {/* <Button
              title="View"
              onPress={() => navigation.navigate("UpcomingEvents")}
            /> */}
          </View>
        ) : (
          <View style={styles.statusTextContainer}>
            <Text style={styles.statusText}>There are no upcoming events.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default DashboardItem;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // For Android shadow effect
    margin: 10,
    width: "100%", // Set the width to 80% of its parent
    alignSelf: "center", // Center the container
    height: 140, // Set the height to 200
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  number: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginRight: 10, // Adds some space between the number and the icon
  },
  title: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statusTextContainer: {
    alignItems: "flex-start", // Align children (Text) to the start
  },
  statusText: {
    fontSize: 16,
    color: "#666",
  },
  icon: {
    color: "#333", // Change the color as needed
  },

  bottomBody: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 30,
  },
  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%", // Ensures the container spans the full width of its parent
  },
});
