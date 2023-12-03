import { StyleSheet, Text, View } from "react-native";
import { Bar } from "react-native-progress";

function ProgressBar({ progress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Progress</Text>
      <Bar progress={progress} color="blue" width={300} height={10} />
    </View>
  );
}

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  text: {
    margin: 5,
  },
});
