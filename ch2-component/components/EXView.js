import { StyleSheet, View } from "react-native";

function EXView() {
  return (
    <View style={styles.container}>
      <View style={styles.childContainer}></View>
      <View style={styles.childContainer}></View>
    </View>
  );
}

export default EXView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  childContainer: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    margin: 10,
  },
});
