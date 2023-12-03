import { Calendar } from "react-native-calendars";

const dayHandler = (day) => {
  console.log(day);
};

function EXCalendar() {
  return <Calendar onDayPress={dayHandler} />;
}

export default EXCalendar;
