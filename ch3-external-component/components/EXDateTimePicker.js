import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";

function EXDateTimePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());

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
    <View>
      <Pressable onPress={showDatePicker}>
        <Text>
          {selectedDate.getFullYear() +
            " " +
            (selectedDate.getMonth() + 1) +
            " " +
            selectedDate.getDate()}
        </Text>
      </Pressable>
    </View>
  );
}

export default EXDateTimePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
