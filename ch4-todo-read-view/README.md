# TODO Navigation

## ⌚목표

> Stack Navigation과 Bottom Tabs Navigation을 사용해서 중첩 네비게이션을 구현할 수 있다.

## To Do Navigation

- Nesting Navigators(중첩 네비게이션)을 사용
  - Stack Navigation
  - Bottom Tabs Navigation

## Setting for Navigation

- Navigation 관련 유틸리티 설치
  - `npm install @react-navigation/native`
  - `npx expo install react-native-screens react-native-safe-area-context`
- Stack Navigation 라이브러리 설치
  - `npm install @react-navigation/native-stack`
- Bottom Tabs Navigation 라이브러리 설치
  - `npm install @react-navigation/bottom-tabs`

## View

- 네비게이션에 3가지 뷰로 구성
  - ManageToDoView
    - todo 추가 및 수정 뷰
  - CalendarToDoListView
    - 달력을 클릭하면 날짜에 따른 todo를 확인하는 뷰
  - DetailView
    - 해당 날짜의 ToDo와 Google Calendar 일정을 볼 수 있는 뷰

## View 코드

- ManageToDoView

```jsx
import { View, Text } from "react-native";

function ManageTodoView() {
  return (
    <View>
      <Text>ManageTodoView</Text>
    </View>
  );
}

export default ManageTodoView;
```

- CalendarTodoListView

```jsx
import { View, Text } from "react-native";

function CalendarTodoListView() {
  return (
    <View>
      <Text>CalendarTodoListView</Text>
    </View>
  );
}

export default CalendarTodoListView;
```

- DetailView

```jsx
import { View, Text } from "react-native";

function DetailView() {
  return (
    <View>
      <Text>DetailView</Text>
    </View>
  );
}

export default DetailView;
```

## Navigation

```jsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageTodoView from "./screens/ManageTodoView";
import CalendarTodoListView from "./screens/CalendarTodoListView";
import Details from "./screens/DetailView";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TimeWiseMainView() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Calendar" component={CalendarTodoListView} />
      <Tab.Screen name="Detail" component={Details} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TimeWiseMainView"
          component={TimeWiseMainView}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Manage" component={ManageTodoView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

- `createNativeStackNavigator` , `createBottomTabNavigator` 함수를 사용해서 Naivgaiton 객체를 초기화
- `Stack` 객체의 Navigator, Screen 컴포넌트를 사용해서 TimeWiseMainView와 ManageTodoView를 Stack Navigation으로 구성
  - `TimeWiseMainView` 은 CalendarTodoView와 ChartView를 Bottom Tab Navigation으로 구성한 컴포넌트
  - `component` 프로퍼티는 직접 View 컴포넌트를 매핑할 수 있지만 Navigation으로 구성된 컴포넌트도 매핑할 수 있다.
- Bottom Tab Navigator를 선언할 컴포넌트 함수인 `TimeWiseMain` 함수를 선언
- `Tab` 객체의 Navigator, Screan 컴포넌트를 사용해서 CalendarTodoView와 DetailView를 Bottom Tab Navigation으로 구성한다.
- `TimeWiseMain` 를 Stack.Screan 으로 매핑

## Style

```jsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageTodoView from "./screens/ManageTodoView";
import CalendarTodoListView from "./screens/CalendarTodoListView";
import ChartView from "./screens/ChartView";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TimeWiseMainView() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Calendar"
        component={CalendarTodoListView}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chart"
        component={ChartView}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TimeWiseMainView"
          component={TimeWiseMainView}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Manage" component={ManageTodoView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

- Screan 컴포넌트는 options 프로퍼티를 통해서 Navigation의 헤더나 Bar를 스타일링 할 수 있다.
- options는 객체를 할당 받으며 객체에서는 key-value로 스타일 설정을 한다.
- `Tab.Screen` 의 options에서는 Tab bar 버튼의 icon을 설정하는 tabBarIcon 프로퍼티를 제공하며 함수를 value로 받는다.
  - 함수의 매개변수로 아이콘의 color와 size 정보가 들어있는 객체를 넘겨 받는데 이는 기본으로 설정되어있는 color와 size를 넘겨 받는다.
  - 넘겨 받은 정보로 icon의 color와 size를 설정한다.
  - icon은 expo 내장 라이브러리인 `@expo/vector-icons` 의 Ionicons 컴포넌트를 사용
- `Stack.Screen` 의 options에서는 headerShown 프로퍼티를 사용했고, value는 fals로 할당하여 Stack.Screen의 헤더를 안보이게 설정했다.
  - TimeWiseMainView는 Tab Navigation의 헤더도 존재하기 때문에 두개의 헤더가 존재 그래서 false로 설정

## Header Button

- Icon Button

```jsx
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View styles={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}
export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 6,
    marginHorizontal: 8,
  },
});
```

- `Pressable` 컴포넌트는 자식 요소를 클릭하면 이벤트를 발생 시키는 컴포넌트이다.
  - onPress 프로퍼티로 클릭했을 때 발생시킬 이벤트 함수를 넘긴다.
- `Ionicons` 컴포넌트를 `View` 컴포넌트로 감싸 icon 버튼을 생성한다.

  - `View` 컴포넌트는 스타일링 하기 위한 컨테이너 역할

- `TimeWiseMainView` 컴포넌트

```jsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageTodoView from "./screens/ManageTodoView";
import CalendarTodoListView from "./screens/CalendarTodoListView";
import DetailView from "./screens/DetailView";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/IconButton";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TimeWiseMainView({ navigation }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Calendar"
        component={CalendarTodoListView}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={30}
              color={tintColor}
              onPress={() => {
                navigation.navigate("Manage");
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Detail"
        component={DetailView}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TimeWiseMainView"
          component={TimeWiseMainView}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Manage" component={ManageTodoView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

- `CalendarTodoListView` 를 매핑 시킨 `Tab.Screen` 컴포넌트의 options에서 `headerRight` 프로퍼티를 추가한다.
  - `headerRight` 프로퍼티는 헤더의 오른쪽 부분에 버튼을 생성하는 프로퍼티이다.
  - value로 함수를 넘겨 받는다.
    - 매개변수는 헤더의 tintColor(헤더의 글자 색)를 담은 객체를 넘긴다.
    - 함수의 내용은 렌더링할 버튼 컴포넌트를 담는다.
