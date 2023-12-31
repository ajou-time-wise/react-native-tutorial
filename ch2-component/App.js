import { StyleSheet, View } from "react-native";
import EXText from "./components/EXText";
import EXPressable from "./components/EXPressable";
import EXButton from "./components/EXButton";
import EXIcon from "./components/EXIcon";
import EXFlatList from "./components/EXFlatList";
import EXTextInput from "./components/EXTextInput";

export default function App() {
  return (
    <View style={styles.container}>
      <EXTextInput />
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
