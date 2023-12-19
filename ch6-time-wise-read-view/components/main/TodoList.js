import { View, FlatList, Text, StyleSheet } from "react-native";
import TodoItem from "./TodoItem";

function TodoList({ todos, selectedDate }) {
  const renderItem = ({ item }) => {
    return <TodoItem todo={item} selectedDate={selectedDate} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Today's Todo</Text>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  text: {
    fontWeight: "bold",
  },
});
