# 📁 External Component

> 앞으로 제작할 Time Wise 어플리케이션에서 사용될 외부 라이브러리 컴포넌트를 알아보고자 한다.

## External Component

- Calendar
- DatePicker
- Bar
- Pie

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
- `npm install --save react-native-calendars`
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
  const [selectedTime, setSelectedTime] = useState(new Date());

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      onChange: (event, selectDate) => {
        const currentDate = selectDate || selectedDate;
        setSelectedDate(currentDate);
      },
      mode: "date",
      is24Hour: true,
    });
  };

  const showTimePicker = () => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      onChange: (event, selectTime) => {
        const currentTime = selectTime || selectedTime;
        setSelectedTime(currentTime);
      },
      mode: "time",
      is24Hour: true,
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
      <Pressable onPress={showTimePicker}>
        <Text>{selectedTime.getHours() + " " + selectedTime.getMinutes()}</Text>
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

### Bar

- 프로그레스 바
- React Native 내장 컴포넌트가 아니기 때문에 라이브러리 설치
- `npm install react-native-progress --save`
- todo 의 진행률을 나타낼 때 사용할 예정
- 주요 프로퍼티
  - `progress` : 진행률을 나타내는 값 (100%가 1)
  - `width` : 너비 설정
  - `height` : 높이 설정
  - `color` : 색상 설정

### Bar 예시 코드

```jsx
import { View } from "react-native";
import { Bar } from "react-native-progress";

function EXBar() {
  return (
    <View>
      <Bar progress={0.5} width={200} height={10} color="blue" />
    </View>
  );
}

export default EXBar;
```

```jsx
import { StyleSheet, View } from "react-native";
import EXCalendar from "./components/EXCalendar";
import EXDateTimePicker from "./components/EXDateTimePicker";
import EXBar from "./components/EXBar";

export default function App() {
  return (
    <View style={styles.container}>
      <EXBar />
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

### Pie

- 원형 그래프
- `npm install react-native-progress --save`
- 주요 프로퍼티
  - `progress` : 진행률
  - `size` : 원형 그래프의 크기
  - `color` : 원형 그래프의 색상
- 24시간 중 사용된 시간 비율 나타내기 위한 원형 그래프로 사용할 예정

### Pie 예시 코드

```jsx
import { Pie } from "react-native-progress";

function EXPie(props) {
  return <Pie progress={0.5} size={100} color="blue" />;
}

export default EXPie;
```

```jsx
import { StyleSheet, View } from "react-native";
import EXCalendar from "./components/EXCalendar";
import EXDateTimePicker from "./components/EXDateTimePicker";
import EXBar from "./components/EXBar";
import EXPie from "./components/EXPie";

export default function App() {
  return (
    <View style={styles.container}>
      <EXPie />
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
