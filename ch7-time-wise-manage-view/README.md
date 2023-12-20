# ⌚TimeWise Todo 생성 화면 구현

> 이번 시간에는 Time Wise Todo 생성 화면을 구현할 예정이다.
> 사전 준비: Software Tool Time 튜토리얼 1~6편 시청

## 필요한 외부 라이브러리

### Community/datetimepicker

- `npm install @react-native-community/datetimepicker --save`
- `npx expo install --fix`
- todo 날짜를 생성할 때 사용할 예정

## Todo 생성화면

### DatePicker.js

```jsx
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
```

- `showDatePicker` DateTimePickerAndroid 객체의 open 함수를 통해 DatePicker를 띄우는 함수
  - value : 초기값 설정
  - onChange : 날짜를 선택했을 때 호출할 함수 설정
  - mode : Date, Time 모드 설정

### ManageView.js

```jsx
import { View, Text, StyleSheet } from "react-native";
import DatePicker from "../components/manage/DatePicker";
import { useState } from "react";

function ManageView(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View style={styles.container}>
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </View>
  );
}

export default ManageView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
```

- `DatePicker` 컴포넌트를 추가
- 간단한 style 적용

### TodoForm.js

```jsx
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

function TodoForm({ todo, setTodo }) {
  return (
    <TextInput style={styles.textInput} value={todo} onChangeText={setTodo} />
  );
}

export default TodoForm;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    width: 200,
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },
});
```

- todo 내용을 입력하는 폼

### ManageView.js

```jsx
import { View, Text, StyleSheet, Button } from "react-native";
import DatePicker from "../components/manage/DatePicker";
import { useState } from "react";
import TodoForm from "../components/manage/TodoForm";

function ManageView(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todo, setTodo] = useState("");

  return (
    <View style={styles.container}>
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <TodoForm todo={todo} setTodo={setTodo} />
      <Button title="add" onPress={() => {}} />
    </View>
  );
}

export default ManageView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
```

- `TodoForm` 을 추가

### ManageView.js Todo 추가 로직

```jsx
import { View, Text, StyleSheet, Button } from "react-native";
import DatePicker from "../components/manage/DatePicker";
import { useState } from "react";
import TodoForm from "../components/manage/TodoForm";
import Todos from "../data/Todo";

function ManageView({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todo, setTodo] = useState("");

  return (
    <View style={styles.container}>
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <TodoForm todo={todo} setTodo={setTodo} />
      <Button
        title="add"
        onPress={() => {
          const newTodo = {
            id: (Todos.length + 1).toString(),
            date: selectedDate,
            isChecked: false,
            todo,
          };
          Todos.push(newTodo);
          navigation.navigate("main");
        }}
      />
    </View>
  );
}

export default ManageView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
```

- Button을 클릭했을 때 더미 Todos 데이터 배열에 새로운 Todo를 추가하는 로직 구현
- 다음 챕터에서 Async Storage로 데이터 저장을 구현하는 것으로 변경할 예정
- add 버튼 클릭시 MainView로 돌아오는 로직 추가
  - `navigation.navigate("main");`
