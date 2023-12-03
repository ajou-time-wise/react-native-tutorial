import { Pressable, StyleSheet, View, Text } from "react-native";

const pressableHandler = () => {
  console.log("hello world!!!");
};

function EXPressable() {
  return (
    <Pressable onPress={pressableHandler}>
      <View style={styles.container}>
        <Text>button</Text>
      </View>
    </Pressable>
  );
}

export default EXPressable;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    backgroundColor: "blue",
  },
});
