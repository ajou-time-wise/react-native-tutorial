import { FlatList, StyleSheet, Text, View } from "react-native";

const DATA = [
  {
    id: 1,
    title: "Item 1",
  },
  {
    id: 2,
    title: "Item 2",
  },
  {
    id: 3,
    title: "Item 3",
  },
  {
    id: 4,
    title: "Item 4",
  },
  {
    id: 5,
    title: "Item 5",
  },
  {
    id: 6,
    title: "Item 6",
  },
];

const Item = ({ item }) => {
  return (
    <View style={styles.childContainer}>
      <Text>{item.title}</Text>
    </View>
  );
};

function EXFlatList() {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={Item}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default EXFlatList;

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    backgroundColor: "grey",
  },
  childContainer: {
    height: 30,
    backgroundColor: "white",
    margin: 10,
  },
});
