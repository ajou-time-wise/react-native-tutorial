import { Calendar } from "react-native-calendars";

function MiniCalendar({ setSeletedDate }) {
  return (
    <Calendar
      onDayPress={(day) => {
        setSeletedDate(new Date(day.dateString));
      }}
    />
  );
}

export default MiniCalendar;
