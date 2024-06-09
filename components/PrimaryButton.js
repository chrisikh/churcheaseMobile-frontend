import { View, Text, Pressable, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import Colors from "../constants/MyColors";
function PrimaryButton({ children, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Button onPress={onPress} color={Colors.primary} title="Button Text">
        {children}
      </Button>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 30,
    margin: 2,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary,
    paddingVertical: 13,
    paddingHorizontal: 10,
    elevation: 2,
    width: 300,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "open-sans-bold",
  },
  pressed: {
    opacity: 0.75,
  },
});
