import { View, StyleSheet } from "react-native";
import MiniCalendar from "../components/main/MiniCalendar";
import { useState, useEffect } from "react";
import TodoList from "../components/main/TodoList";
import Todos from "../data/Todo";
import { useTodoContext } from "../hooks/TodoProvider";

function MainView() {
  const { data } = useTodoContext();
  const [selectedDate, setSeletedDate] = useState(new Date());
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const filteredTodos = data.filter((todo) => {
      const parts = todo.date.split(/[-T:.Z]/);
      const parsedYear = parseInt(parts[0], 10);
      const parsedMonth = parseInt(parts[1], 10) - 1;
      const parsedDay = parseInt(parts[2], 10);
      return (
        parsedYear === selectedDate.getFullYear() &&
        parsedMonth === selectedDate.getMonth() &&
        parsedDay === selectedDate.getDate()
      );
    });
    setTodos(filteredTodos);
  }, [selectedDate, data]);

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
