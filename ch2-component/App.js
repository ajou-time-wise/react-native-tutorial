import { StyleSheet, View } from "react-native";
import EXView from "./components/EXView";
import EXText from "./components/EXText";

export default function App() {
  return (
    <View style={styles.container}>
      <EXView />
      <EXView />
      <EXView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
});
