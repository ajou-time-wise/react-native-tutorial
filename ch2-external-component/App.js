import { StyleSheet, View } from "react-native";
import EXCalendar from "./components/EXCalendar";

export default function App() {
  return (
    <View style={styles.container}>
      <EXCalendar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
