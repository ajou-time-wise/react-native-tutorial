import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

function TodoForm({ todo, setTodo }) {
  return (
    <TextInput style={styles.textInput} value={todo} onChangeText={setTodo} />
  );
}

export default TodoForm;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    width: 200,
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },
});
