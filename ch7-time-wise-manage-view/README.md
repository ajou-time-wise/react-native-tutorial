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
  },
  {
    id: "2",
    date: new Date(2023, 11, 10),
    isChecked: false,
    todo: "todo2",
  },
  {
    id: "3",
    date: new Date(2023, 11, 10),
    isChecked: true,
    todo: "todo3",
  },
  {
    id: "4",
    date: new Date(2023, 11, 10),
    isChecked: true,
    todo: "todo4",
  },
  {
    id: "5",
    date: new Date(2023, 11, 10),
    isChecked: true,
    todo: "todo5",
  },
  {
    id: "6",
    date: new Date(2023, 11, 11),
    isChecked: false,
    todo: "todo6",
  },
  {
    id: "7",
    date: new Date(2023, 11, 11),
    isChecked: true,
    todo: "todo7",
  },
  {
    id: "8",
    date: new Date(2023, 11, 12),
    isChecked: false,
    todo: "todo8",
  },
  {
    id: "9",
    date: new Date(2023, 11, 12),
    isChecked: false,
    todo: "todo9",
  },
  {
    id: "10",
    date: new Date(2023, 11, 12),
    isChecked: false,
    todo: "todo1",
  },
];

module.exports = Todos;
```

- 해당 더미 데이터로 Todo 리스트를 구현할 예정

## 필요한 외부 라이브러리

### react-native-calendars

- `npm install --save react-native-calendars`
- 캘린더의 날짜를 클릭했을 때 해당 날짜의 todo 조회

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
  - selectedDate 상태값을 변경하는 setSelectedDate 함수를 prop으로 넘겨받음

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

- `selectedDate` 캘린더에서 선택한 날짜를 담는 상태 값
- flex
  - 부모 컨테이너 내에서 자식 요소의 크기를 상대적인 비율로 나타내는데 사용
  - 부모 컨테이너 안에 자식 요소가 2개가 있고 자식 요소의 flex 값이 2이면 다른 자식 요소보다 2배의 공간을 차지
  - 1로 설정하여 부모 요소 안에서 자식 컴포넌트 끼리 균등한 공간 배분을 한다.
  - 여기에서는 부모 요소가 화면이기 때문에 View는 화면 크기에 맞춰 배치

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

- FlatList
  - data 프로퍼티에 todos를 넘겨받아 todo 항목을 목록으로 띄움
  - renderItem 각 todo를 renderItem 함수로 컴포넌트로 변환
  - KeyExtractor item은 todo와 같고 todo의 id를 키 값으로 설정
- renderItem
  - todo를 TodoItem 컴포넌트로 변환하여 return

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
  - todo의 완료 여부 isChecked
  - todo의 title
- style
  - flexDirection : 정렬축이 가로
  - justifyContent: 정렬축으로 어떻게 자식 컴포넌트를 배치할지 결정
    - 해당 코드에서는 자식 요소들 사이에 공간을 균등하게 분배

### MainView.js

```jsx
import { View, StyleSheet } from "react-native";
import MiniCalendar from "../components/main/MiniCalendar";
import { useState, useEffect } from "react";
import TodoList from "../components/main/TodoList";
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
