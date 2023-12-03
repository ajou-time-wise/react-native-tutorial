import { StyleSheet, View } from "react-native";

function EXView() {
  return (
    <View style={styles.container}>
      <View style={styles.chilidContainer}></View>
    </View>
  );
}

export default EXView;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    backgroundColor: "yellow",
    margin: 10,
  },
  chilidContainer: {
    width: 50,
    height: 50,
    backgroundColor: "orange",
  },
});
