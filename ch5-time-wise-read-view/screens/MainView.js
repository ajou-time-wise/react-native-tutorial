import { View, Text, StyleSheet } from "react-native";
import MiniCalendar from "../components/main/MiniCalendar";
import { useState, useEffect } from "react";
import TodoList from "../components/main/TodoList";
import ProgressBar from "../components/main/ProgressBar";
import Todos from "../data/Todo";

function MainView() {
  const [selectedDate, setSeletedDate] = useState(new Date());
  const [todos, setTodos] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const filteredTodos = Todos.filter((todo) => {
      return (
        todo.date.getFullYear() === selectedDate.getFullYear() &&
        todo.date.getMonth() === selectedDate.getMonth() &&
        todo.date.getDate() === selectedDate.getDate()
      );
    });
    setTodos(filteredTodos);
    const totalTodos = filteredTodos.length;
    const completedTodos = filteredTodos.filter(
      (todo) => todo.isChecked
    ).length;
    const calculatedProgress = totalTodos > 0 ? completedTodos / totalTodos : 0;
    setProgress(calculatedProgress);
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <MiniCalendar setSeletedDate={setSeletedDate} />
      <ProgressBar progress={progress} />
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
