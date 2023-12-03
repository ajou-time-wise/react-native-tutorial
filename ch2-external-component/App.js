import { StyleSheet, View } from "react-native";
import EXCalendar from "./components/EXCalendar";
import EXDateTimePicker from "./components/EXDateTimePicker";
import EXBar from "./components/EXBar";
import EXPie from "./components/EXPie";
import EXCheckBox from "./components/EXCheckBox";

export default function App() {
  return (
    <View style={styles.container}>
      <EXCheckBox />
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
