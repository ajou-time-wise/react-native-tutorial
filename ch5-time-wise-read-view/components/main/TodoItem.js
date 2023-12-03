import { View, Text, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import IconButton from "../../components/IconButton";

function TodoItem({ todo }) {
  return (
    <View style={styles.container}>
      <Checkbox value={todo.isChecked} onValueChange={() => {}} />
      <Text>{todo.todo}</Text>
      <Text>
        {todo.spendTime.getHours() + "H" + todo.spendTime.getMinutes() + "M"}
      </Text>
      <IconButton icon="close" size={20} color="grey" onPress={() => {}} />
    </View>
  );
}

export default TodoItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "skyblue",
    width: 300,
    padding: 5,
    margin: 5,
  },
});
