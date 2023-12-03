import { View, Text, StyleSheet } from "react-native";
import MiniCalendar from "../components/main/MiniCalendar";
import { useState } from "react";

function MainView() {
  const [selectedDate, setSeletedDate] = useState(new Date());
  return (
    <View style={styles.container}>
      <MiniCalendar setSeletedDate={setSeletedDate} />
    </View>
  );
}

export default MainView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
