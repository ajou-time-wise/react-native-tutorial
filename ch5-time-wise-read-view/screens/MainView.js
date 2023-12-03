import { View, Text, StyleSheet } from "react-native";
import MiniCalendar from "../components/main/MiniCalendar";
import { useState } from "react";
import TodoList from "../components/main/TodoList";

function MainView() {
  const [selectedDate, setSeletedDate] = useState(new Date());
  return (
    <View style={styles.container}>
      <MiniCalendar setSeletedDate={setSeletedDate} />
      <TodoList selectedDate={selectedDate} />
    </View>
  );
}

export default MainView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
