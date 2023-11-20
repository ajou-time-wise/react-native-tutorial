# 🧭React Native Navigation

## React Routing

- 브라우저에서 앵커 태그를 사용하여 링크를 통해 다른 페이지로 이동
- 링크를 클릭하면 url은 브라우저의 히스토리 스택으로 푸시
- 사용자가 뒤로가기 버튼을 누르면 브라우저는 히스토리 스택의 맨위 url을 pop하고 이전에 방문한 페이지로 이동

## React Native

- React Native에서는 브라우저처럼 전역 히스토리 스택에 대한 기능이 없다.
- 대신 브라우저처럼 화면 전환과 화면 이동의 히스토리를 관리할 수 있는 기능인 Navigation을 제공
- 앱이 하나의 Stack Navigation을 사용하는 경우, 웹 브라우저가 히스토리를 처리하는 방식과 유사
- 하지만 큰 차이점은 React Native Navigation은 경로 간 Naviagation 처리를 할 때 네이티브 제스처와 애니메이션을 제공

## Start React Native Navigation

- Navigation 기능을 사용하기 위해서는 라이브러리를 설치
- `npm install @react-navigation/native`
  - Navigation 유틸리티 설치
- `npx expo install react-native-screens react-native-safe-area-context`
  - expo 호환 라이브러리 설치

## Stack Navigation

- Stack Navigation 라이브러리 설치
- `npm install @react-navigation/native-stack`
- `createNativeStackNavigator 함수`
  - 해당 함수를 사용하여 `Screan` 과 `Navigator` 컴포넌트 반환받는다.
    - Screan
      - 뷰를 매핑하는 컴포넌트
    - Navigator
      - 뷰를 구성하는 컴포넌트
- `NavigationContainer`
  - Navigation 구성을 매핑하는 컴포넌트
  - `app.js` 파일에서 렌더링

## Stack Navigation 실습

- HomeScrean 생성

```jsx
// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
```

- HomeScrean 컴포넌트를 생성해서 `Stack.Screan` 으로 뷰를 매핑시킨다.
- `Stack.Navigator` 를 사용해서 Navigation에 필요한 뷰를 구성한다.
- `NavigationContainer` 를 사용해서 구성된 navigation을 매핑시키고 렌더링을 한다.

## 화면 추가

```jsx
function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## 화면 이동

```jsx
import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}

// ... other code from the previous section
```

- `HomeScrean` 컴포넌트 함수에 `Button` 컴포넌트 추가
  - `onPress` 프로퍼티에 버튼을 클릭했을 때 실행시킬 함수를 할당
- `navigation` 은 Stack Navigation에 매핑된 뷰 모두 prop으로 전달받음
- `navigation.navigate("이동할 뷰의 이름")`
  - 해당 함수는 뷰를 전환한다.

## Bottom Tabs Navigation

- 화면 하단의 탭으로 화면을 전환한다.
- 해당 Navigation을 사용하기 위해서는 라이브러리를 설치해야 한다.
  - `npm install @react-navigation/bottom-tabs`

## Bottom Tabs Navigation 실습

```jsx
import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Detail" component={DetailsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

- `Stack Navigation` 과 사용 방법이 유사하다.
- 차이점은 하단에 탭으로 바로 이동이 가능해 `navigation.navigate()` 함수로 화면을 전환시킬 필요가 없다.
