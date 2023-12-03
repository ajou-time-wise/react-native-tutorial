import { StyleSheet, Text, View } from "react-native";

function EXText() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
    </View>
  );
}

export default EXText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  text: {
    fontSize: 50,
    color: "white",
    fontWeight: "bold",
  },
});
