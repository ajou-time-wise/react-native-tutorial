import { StyleSheet, Text } from "react-native";

function EXText() {
  return <Text style={styles.text}>Hello World!</Text>;
}

export default EXText;

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
    color: "white",
    fontWeight: "bold",
  },
});
