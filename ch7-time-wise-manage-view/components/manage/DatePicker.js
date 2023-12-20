import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";

function DatePicker({ selectedDate, setSelectedDate }) {
  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      onChange: (event, selectDate) => {
        const currentDate = selectDate || selectedDate;
        setSelectedDate(currentDate);
      },
      mode: "date",
    });
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={showDatePicker}>
        <Text style={styles.text}>
          {selectedDate.getFullYear() +
            " - " +
            (selectedDate.getMonth() + 1) +
            " - " +
            selectedDate.getDate()}
        </Text>
      </Pressable>
    </View>
  );
}

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "skyblue",
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
