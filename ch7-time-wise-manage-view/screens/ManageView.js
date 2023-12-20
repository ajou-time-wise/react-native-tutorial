import { View, Text, StyleSheet, Button } from "react-native";
import DatePicker from "../components/manage/DatePicker";
import { useState } from "react";
import TodoForm from "../components/manage/TodoForm";
import Todos from "../data/Todo";

function ManageView({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todo, setTodo] = useState("");

  return (
    <View style={styles.container}>
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <TodoForm todo={todo} setTodo={setTodo} />
      <Button
        title="add"
        onPress={() => {
          const newTodo = {
            id: (Todos.length + 1).toString(),
            date: selectedDate,
            isChecked: false,
            todo,
          };
          Todos.push(newTodo);
          navigation.navigate("main");
        }}
      />
    </View>
  );
}

export default ManageView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
