import { StyleSheet, View } from "react-native";
import EXView from "./components/EXView";
import EXText from "./components/EXText";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <EXView /> */}
      <EXText />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
