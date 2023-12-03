# 🪧Time Wise Todo Navigation

> 이번 챕터에서는 Time Wise의 Todo 조회 화면, Todo 생성 화면의 네비게이션 설정을 하고자 한다.
> 사전 준비 : 개발환경 세팅, 기본 컴포넌트 개념, 네비게이션 튜토리얼 시청

## Navigation

### Stack Navigation

- `npm install @react-navigation/native`
- `npx expo install react-native-screens react-native-safe-area-context`
- `npm install @react-navigation/native-stack`

## 화면 구성

### MainView.js

```jsx
import { View, Text } from "react-native";

function MainView() {
  return (
    <View>
      <Text>MainView</Text>
    </View>
  );
}

export default MainView;
```

- 캘린더, Todo List 조회 뷰

### ManageView.js

```jsx
import { View, Text } from "react-native";

function ManageView(props) {
  return (
    <View>
      <Text>ManageView</Text>
    </View>
  );
}

export default ManageView;
```

- Todo 생성 뷰

### App.js

```jsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ManageView from "./screens/ManageView";
import MainView from "./screens/MainView";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="main" component={MainView} />
        <Stack.Screen name="manage" component={ManageView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

- `MainView` , `ManageView` 화면을 Stack Navigation으로 구성

## Icon 버튼 생성

### IconButton.js

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

- Icon으로 구성된 버튼 생성
- `@expo/vector-icons` 라이브러리를 사용하여 icon 사용

## 화면 이동

### App.js

```jsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ManageView from "./screens/ManageView";
import MainView from "./screens/MainView";
import IconButton from "./components/IconButton";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
```

- Screen 컴포넌트의 `options` 프로퍼티를 사용하여 헤더에 버튼 생성
  - `options` 프로퍼티는 네비게이션 화면에 특정한 설정을 적용할 때 사용
  - `options` 는 함수거나 객체일 수 있다. (여기서는 함수로 사용하여 navigation 객체를 prop으로 받고 있다.)
- `headerRight`
  - 헤더의 오른쪽 부분 요소를 정의하는 옵션
  - 여기서는 `IconButton`을 정의하고 있다.
- `IconButton`
  - `IconButton` 을 클릭했을 때 `navigation` 객체의 `navigate` 함수를 이용해서 `manage` 뷰로 이동한다.
