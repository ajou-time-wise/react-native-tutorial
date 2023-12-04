# 📁 External Components

> 앞으로 제작할 Time Wise 어플리케이션에서 사용될 외부 라이브러리 컴포넌트를 알아보고자 한다.

## External Component

- Calendar
- DatePicker
- CheckBox

### Calendar

- calendar 컴포넌트
- 달력을 클릭했을 때 해당 날짜에 대한 ToDo가 나오도록 구현할 때 사용할 예
- React Native에서는 내장 Calendar 컴포넌트가 없기 때문에 외부 라이브러리를 설치
- `npm install --save react-native-calendars`
- 주요 프로퍼티
  - `onDayPress` : 날짜를 클릭했을 때 정의된 이벤트 호출
  - Time Wise에서는 날짜를 클릭했을 때 해당 날의 Todo를 출력하도록 구현
- 다양한 프로퍼티 존재
  - [react-native-calendars 링크](https://www.npmjs.com/package/react-native-calendars#for-detailed-information-on-using-this-component-see-the-official-documentation-site)
  - 해당 링크 참고

### Calendar 예제 코드

```jsx
import { Calendar } from "react-native-calendars";

const dayHandler = (day) => {
  console.log(day);
};

function EXCalendar() {
  return <Calendar onDayPress={dayHandler} />;
}

export default EXCalendar;
```

```jsx
import { StyleSheet, View } from "react-native";
import EXCalendar from "./components/EXCalendar";

export default function App() {
  return (
    <View style={styles.container}>
      <EXCalendar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
```

### DateTimePickerAndroid

- 안드로이드 환경에서 날짜와 시간을 입력할 수 있는 폼 제공
- `npm install @react-native-community/datetimepicker --save`
- `npx expo install --fix`
  - expo 버전 호환 문제 시 해당 명령어 입력
- DateTimePickerAndroid 객체를 사용해서 날짜, 시간 선택 폼 open

### DateTimePickerAndroid 예시 코드

```jsx
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
```

- `selectedDate` datePicker에서 선택한 날짜를 담을 상태변수
- `showDatePicker` DateTimePickerAndroid객체의 open함수를 통해 DatePicker를 띄우는 함수
  - value : 초기값 설정
  - onChange : 날짜를 선택했을 때 호출할 함수 설정
  - mode : Date, Time 모드 설정

```jsx
import { StyleSheet, View } from "react-native";
import EXCalendar from "./components/EXCalendar";
import EXDateTimePicker from "./components/EXDateTimePicker";

export default function App() {
  return (
    <View style={styles.container}>
      <EXDateTimePicker />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
```

### CheckBox

- `npx expo install expo-checkbox`
- todo의 완료 여부를 나타내는데 사용할 예정

### CheckBox 예제 코드

```jsx
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Text, View } from "react-native";

function EXCheckBox() {
  const [isComplete, setIsComplete] = useState(false);
  return (
    <View>
      <Checkbox
        value={isComplete}
        onValueChange={() => setIsComplete(!isComplete)}
      />
      <Text>{isComplete ? "true" : "false"}</Text>
    </View>
  );
}

export default EXCheckBox;
```

```jsx
import { StyleSheet, View } from "react-native";
import EXCalendar from "./components/EXCalendar";
import EXDateTimePicker from "./components/EXDateTimePicker";
import EXBar from "./components/EXBar";
import EXPie from "./components/EXPie";
import EXCheckBox from "./components/EXCheckBox";

export default function App() {
  return (
    <View style={styles.container}>
      <EXCheckBox />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
```
