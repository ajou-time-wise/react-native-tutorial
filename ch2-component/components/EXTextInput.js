import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
function EXTextInput() {
  const [text, setText] = useState("");
  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} value={text} onChangeText={setText} />
      <Text>{text}</Text>
    </View>
  );
}

export default EXTextInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300,
    justifyContent: "center",
  },
  textInput: {
    borderWidth: 1,
  },
});
