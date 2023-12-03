# ⌚ Time Wise Todo 조회 화면 구현

> 이번 챕터에서는 Time Wise의 Todo 리스트를 확인할 수 있는 화면을 구현할 예정이다.
> 사전 준비 : Time Wise Navigation 프로젝트 및 튜토리얼 영상 시청

## Todo 더미 데이터

### Todo.js

```json
const Todos = [
  {
    id: "1",
    date: new Date(2023, 11, 9),
    isChecked: true,
    todo: "todo1",
    spendTime: new Date(0, 0, 0, 1, 0, 0, 0),
  },
  {
    id: "2",
    date: new Date(2023, 11, 10),
    isChecked: false,
    todo: "todo2",
    spendTime: new Date(0, 0, 0, 2, 0, 0, 0),
  },
  {
    id: "3",
    date: new Date(2023, 11, 10),
    isChecked: true,
    todo: "todo3",
    spendTime: new Date(0, 0, 0, 1, 0, 0, 0),
  },
  {
    id: "4",
    date: new Date(2023, 11, 10),
    isChecked: true,
    todo: "todo4",
    spendTime: new Date(0, 0, 0, 0, 30, 0, 0),
  },
  {
    id: "5",
    date: new Date(2023, 11, 10),
    isChecked: true,
    todo: "todo5",
    spendTime: new Date(0, 0, 0, 1, 0, 0, 0),
  },
  {
    id: "6",
    date: new Date(2023, 11, 11),
    isChecked: false,
    todo: "todo6",
    spendTime: new Date(0, 0, 0, 1, 0, 0, 0),
  },
  {
    id: "7",
    date: new Date(2023, 11, 11),
    isChecked: true,
    todo: "todo7",
    spendTime: new Date(0, 0, 0, 1, 0, 0, 0),
  },
  {
    id: "8",
    date: new Date(2023, 11, 12),
    isChecked: false,
    todo: "todo8",
    spendTime: new Date(0, 0, 0, 5, 0, 0, 0),
  },
  {
    id: "9",
    date: new Date(2023, 11, 12),
    isChecked: false,
    todo: "todo9",
    spendTime: new Date(0, 0, 0, 2, 0, 0, 0),
  },
  {
    id: "10",
    date: new Date(2023, 11, 12),
    isChecked: false,
    todo: "todo1",
    spendTime: new Date(0, 0, 0, 1, 0, 0, 0),
  },
];

module.exports = Todos;
```

- 해당 더미 데이터로 Todo 리스트를 구현할 예정

## 필요한 외부 라이브러리

### react-native-calendars

- `npm install --save react-native-calendars`
- 캘린더의 날짜를 클릭했을 때 해당 날짜의 todo 조회

### react-native-progress

- `npm install react-native-progress --save`
- Todo의 진행률을 표현

### expo-checkbox

- `npx expo install expo-checkbox`
- Todo 체크박스

## MiniClanedar

### MiniCalendar.js

```jsx
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
```

- `onDayPress` 날짜를 클릭했을 때 정의된 이벤트 실행
  - 해당 프로젝트에서는 날짜를 클릭했을 때 selectedDate 상태를 변화

### Main.js

```jsx
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
```

- `selectedDate` 캘린더에서 선택한 날짜를 담는 상태값

## TodoList

### TodoList.js

```jsx
import { View, FlatList, Text, StyleSheet } from "react-native";
import TodoItem from "./TodoItem";

function TodoList({ todos, selectedDate }) {
  const renderItem = ({ item }) => {
    return <TodoItem todo={item} selectedDate={selectedDate} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Today's Todo</Text>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  text: {
    fontWeight: "bold",
  },
});
```

### TodoItem.js

```jsx
import { View, Text, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import IconButton from "../../components/IconButton";

function TodoItem({ todo }) {
  return (
    <View style={styles.container}>
      <Checkbox value={todo.isChecked} onValueChange={() => {}} />
      <Text>{todo.todo}</Text>
      <Text>
        {todo.spendTime.getHours() + "H" + todo.spendTime.getMinutes() + "M"}
      </Text>
      <IconButton icon="close" size={20} color="grey" onPress={() => {}} />
    </View>
  );
}

export default TodoItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "skyblue",
    width: 300,
    padding: 5,
    margin: 5,
  },
});
```

- `FlatList` 의 rendering Component

### MainView.js

```jsx
import { View, StyleSheet } from "react-native";
import MiniCalendar from "../components/main/MiniCalendar";
import { useState, useEffect } from "react";
import TodoList from "../components/main/TodoList";
import ProgressBar from "../components/main/ProgressBar";
import Todos from "../data/Todo";

function MainView() {
  const [selectedDate, setSeletedDate] = useState(new Date());
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const filteredTodos = Todos.filter((todo) => {
      return (
        todo.date.getFullYear() === selectedDate.getFullYear() &&
        todo.date.getMonth() === selectedDate.getMonth() &&
        todo.date.getDate() === selectedDate.getDate()
      );
    });
    setTodos(filteredTodos);
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <MiniCalendar setSeletedDate={setSeletedDate} />
      <ProgressBar progress={0.5} />
      <TodoList selectedDate={selectedDate} todos={todos} />
    </View>
  );
}

export default MainView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

- `useEffect`
  - `selectedDate` 의 상태가 변할 때마다 선택된 날짜의 Todos를 필터링한다.

## Progress

### ProgressBar.js

```jsx
import { StyleSheet, Text, View } from "react-native";
import { Bar } from "react-native-progress";

function ProgressBar({ progress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Progress</Text>
      <Bar progress={progress} color="blue" width={300} height={10} />
    </View>
  );
}

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  text: {
    margin: 5,
  },
});
```

### MainView.js

```jsx
import { View, Text, StyleSheet } from "react-native";
import MiniCalendar from "../components/main/MiniCalendar";
import { useState, useEffect } from "react";
import TodoList from "../components/main/TodoList";
import ProgressBar from "../components/main/ProgressBar";
import Todos from "../data/Todo";

function MainView() {
  const [selectedDate, setSeletedDate] = useState(new Date());
  const [todos, setTodos] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const filteredTodos = Todos.filter((todo) => {
      return (
        todo.date.getFullYear() === selectedDate.getFullYear() &&
        todo.date.getMonth() === selectedDate.getMonth() &&
        todo.date.getDate() === selectedDate.getDate()
      );
    });
    setTodos(filteredTodos);
    const totalTodos = filteredTodos.length;
    const completedTodos = filteredTodos.filter(
      (todo) => todo.isChecked
    ).length;
    const calculatedProgress = totalTodos > 0 ? completedTodos / totalTodos : 0;
    setProgress(calculatedProgress);
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <MiniCalendar setSeletedDate={setSeletedDate} />
      <ProgressBar progress={progress} />
      <TodoList selectedDate={selectedDate} todos={todos} />
    </View>
  );
}

export default MainView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

- `useEffect` 에서 `selectedDate` 의 상태값이 변할 때마다 `filteredTodos` 의 진행률을 구한다.
