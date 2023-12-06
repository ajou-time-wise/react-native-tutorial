import { View, StyleSheet } from "react-native";
import MiniCalendar from "../components/main/MiniCalendar";
import { useState, useEffect } from "react";
import TodoList from "../components/main/TodoList";
import Todos from "../data/Todo";

function MainView() {
  const [selectedDate, setSeletedDate] = useState(new Date());
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const filteredTodos = Todos.filter((todo) => {
      return (
        todo.date.getFullYear() === selectedDate.getFullYear() &&
        todo.date.getMonth() === selectedDate.getMonth() &&
        todo.date.getDate() === selectedDate.getDate()
      );
    });
    setTodos(filteredTodos);
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <MiniCalendar setSeletedDate={setSeletedDate} />
      <TodoList selectedDate={selectedDate} todos={todos} />
    </View>
  );
}

export default MainView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
