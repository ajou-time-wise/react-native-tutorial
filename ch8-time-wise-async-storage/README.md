# ⌚TimeWise Todo Async Storage 저장

> 이번 시간에는 Time Wise 에서 Async Storage를 활용한 데이터 저장을 구현할 예정이다.
> 사전 준비: Software Tool Time 튜토리얼 1~7편 시청

## 필요한 외부 라이브러리

### react-native-async-storage/async-storage

- `npx expo install @react-native-async-storage/async-storage`

## Context 적용

### TodoProvider.js

```jsx
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [data, setData] = useState([]);

  return (
    <TodoContext.Provider
      value={{
        data,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodoContext = () => {
  return useContext(TodoContext);
};
```

- Context는 state를 props로 전달하지 않고 전역에서 공유하는 방식으로 사용할 때 사용한다.
- React 빌트인 기능이며 외부 라이브러리를 설치할 필요가 없다.
- `craeteContext` 로 Context를 생성한다.
- `TodoProvider` 컴포넌트 함수를 선언하여 `Todo.Provider` 컴포넌트를 사용하여 전역으로 사용할 상태 변수와 함수 등 `value` 프로퍼티로 지정한다.
- 다른 컴포넌트에서 해당 상태변수, 함수를 사용할 수 있도록 `useContext` 함수를 사용해서 공유 함수를 만들어 준다.

### App.js

```jsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ManageView from "./screens/ManageView";
import MainView from "./screens/MainView";
import IconButton from "./components/IconButton";
import { TodoProvider } from "./hooks/TodoProvider";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <TodoProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="main"
            component={MainView}
            options={({ navigation }) => ({
              headerRight: () => (
                <IconButton
                  icon="add"
                  size={30}
                  color="black"
                  onPress={() => {
                    navigation.navigate("manage");
                  }}
                />
              ),
            })}
          />
          <Stack.Screen name="manage" component={ManageView} />
        </Stack.Navigator>
      </TodoProvider>
    </NavigationContainer>
  );
}
```

- 하위 컴포넌트가 Provider의 전역 상태함수와 함수를 사용하기 위해서 `TodoProvider` 컴포넌트로 `Stack.Navigator` 를 감싼다.

## Async Storage 적용

### TodoProvider.js

```jsx
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async (date, todo) => {
    try {
      const newTodo = {
        id: Date.now().toString(),
        date,
        todo,
        isChecked: false,
      };

      const updateTodos = [...data, newTodo];
      setData(updateTodos);

      await AsyncStorage.setItem("timeWise", JSON.stringify(updateTodos));
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };
  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem("timeWise");
      if (storedTodos) {
        setData(JSON.parse(storedTodos));
      }
      console.log(data);
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        data,
        addTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodoContext = () => {
  return useContext(TodoContext);
};
```

- `addTodo`
  - AsyncStorage의 setItem 함수를 통해서 key값과 함께 Todo의 배열을 문자열 형태로 저장
- `loadTodos`
  - AsyncStorage에 저장되어 있는 timeWise 키값과 저장되어 있는 Todos 배열 데이터를 조회하는 함수
  - AsyncStorage의 getItem 함수를 사용해서 데이터 조회
- `useEffect`
  - Context Provider가 렌더링 되었을 때 loadTodos 함수를 호출하여 todos 데이터 조회 및 data 상태 변수에 저장

### ManageView.js

```jsx
import { View, Text, StyleSheet, Button } from "react-native";
import DatePicker from "../components/manage/DatePicker";
import { useState } from "react";
import TodoForm from "../components/manage/TodoForm";
import Todos from "../data/Todo";
import { useTodoContext } from "../hooks/TodoProvider";

function ManageView({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodoContext();

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
          addTodo(selectedDate.toISOString(), todo);
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

- `Button` 의 onPress 프로퍼티 수정
  - 기존 코드는 더미 데이터 배열에 새로운 todo 데이터를 push한 형식이라면 addTodo 함수를 호출해서 새로운 todo 데이터를 Async Storage에 저장
- `selectedDate` 에 Date 객체를 저장했지만 AsyncStorage에 문자열로 저장되는 문제로 toISOString 형태로 변환해서 저장
  - Async Storage에 저장되어 있는 것은 날짜 문자열로 저장되어 있지만 추가했을 시 Date 객체로 추가하면 날짜 필터링할 때 문제 발생
  - 어떤 것은 문자열이고 어떤 것은 문자열이 아닌 문제

### MainView.js

```jsx
import { View, StyleSheet } from "react-native";
import MiniCalendar from "../components/main/MiniCalendar";
import { useState, useEffect } from "react";
import TodoList from "../components/main/TodoList";
import Todos from "../data/Todo";
import { useTodoContext } from "../hooks/TodoProvider";

function MainView() {
  const { data } = useTodoContext();
  const [selectedDate, setSeletedDate] = useState(new Date());
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const filteredTodos = data.filter((todo) => {
      const parts = todo.date.split(/[-T:.Z]/);
      const parsedYear = parseInt(parts[0], 10);
      const parsedMonth = parseInt(parts[1], 10) - 1;
      const parsedDay = parseInt(parts[2], 10);
      return (
        parsedYear === selectedDate.getFullYear() &&
        parsedMonth === selectedDate.getMonth() &&
        parsedDay === selectedDate.getDate()
      );
    });
    setTodos(filteredTodos);
  }, [selectedDate, data]);

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

- useEffect
  - Async Storage에 저장된 Todo 배열을 data 상태 변수로 조회하고 Todo의 Date를 파싱해서 `selectedDate` 와 비교한다.

### TodoProvier.js todo 삭제 및 토글 구현

```jsx
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async (date, todo) => {
    try {
      const newTodo = {
        id: Date.now().toString(),
        date,
        todo,
        isChecked: false,
      };

      const updateTodos = [...data, newTodo];
      setData(updateTodos);

      await AsyncStorage.setItem("timeWise", JSON.stringify(updateTodos));
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem("timeWise");
      if (storedTodos) {
        setData(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const updatedTodos = data.filter((todo) => todo.id !== id);
      setData(updatedTodos);

      await AsyncStorage.setItem("timeWise", JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const updatedTodos = data.map((todo) =>
        todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
      );
      setData(updatedTodos);

      await AsyncStorage.setItem("timeWise", JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        data,
        addTodo,
        deleteTodo,
        loadTodos,
        toggleTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodoContext = () => {
  return useContext(TodoContext);
};
```

- `deleteTodo`
  - data 상태 변수에 있는 Todo 배열에 해당 id가 있는 배열을 제외 한 나머지 배열을 return 받아 timeWise의 key로 저장한다.
- `toggleTodo`
  - data 상태 변수에 있는 Todo 배열에 해당 id인 todo를 찾아 isChecked 값을 변경한 뒤 다시 timeWise의 key로 저장한다.

### TodoItem.js 수정

```jsx
import { View, Text, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import IconButton from "../../components/IconButton";
import { useTodoContext } from "../../hooks/TodoProvider";

function TodoItem({ todo }) {
  const { deleteTodo, toggleTodo } = useTodoContext();
  return (
    <View style={styles.container}>
      <Checkbox
        value={todo.isChecked}
        onValueChange={() => {
          toggleTodo(todo.id);
        }}
      />
      <Text>{todo.todo}</Text>
      <IconButton
        icon="close"
        size={20}
        color="grey"
        onPress={() => {
          deleteTodo(todo.id);
        }}
      />
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

- check 시 토클 이벤트와 삭제 버튼 클릭 시 `toggleTodo` 함수 내용 정의
- 삭제 버튼 클릭시 `deleteTodo` 실행
