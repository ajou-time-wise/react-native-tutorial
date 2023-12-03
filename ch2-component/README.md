# 📁 React Native Componet

> 앞으로 제작할 Time Wise에서 사용될 주요 React Native내장 컴포넌트를 알아보고자 한다.

## React Native Component

### View

- UI를 구축하기 위한 가장 기본적인 구성요소인 컨테이너 역할
- flexBox, style, 터치 처리 등과 같은 스타일링이나 event 처리할 때 사용
- html에서 `<div>` 역할을 수행
- `react-native` 내장 라이브러리에서 import

### View 예시

```jsx
import { StyleSheet, View } from "react-native";

function EXView() {
  return (
    <View style={styles.container}>
      <View style={styles.chilidContainer}></View>
    </View>
  );
}

export default EXView;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    backgroundColor: "yellow",
    margin: 10,
  },
  chilidContainer: {
    width: 50,
    height: 50,
    backgroundColor: "orange",
  },
});
```

```jsx
import { StyleSheet, View } from "react-native";
import EXView from "./components/EXView";
import EXText from "./components/EXText";

export default function App() {
  return (
    <View style={styles.container}>
      <EXView />
      <EXView />
      <EXView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
});
```

### Text

- 텍스트를 표시하기 위한 컴포넌트
- HTML과는 다르게 <View> 태그 내부에 텍스트를 담을 수 없다.

### Text 예시

```jsx
import { StyleSheet, Text } from "react-native";

function EXText() {
  return <Text style={styles.text}>Hello World!</Text>;
}

export default EXText;

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
    color: "white",
    fontWeight: "bold",
  },
});
```

```jsx
import { StyleSheet, View } from "react-native";
import EXText from "./components/EXText";

export default function App() {
  return (
    <View style={styles.container}>
      <EXText />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
});
```

### Pressable

- 하위 컴포넌트에 `<Pressable>` 컴포넌트로 감싸면 하위 컴포넌트를 클릭할 때마다 정의된 이벤트가 실행
- onPress 프로퍼티에 이벤트를 정의

### Pressable 예시

```jsx
import { Pressable, StyleSheet, View, Text } from "react-native";

const pressableHandler = () => {
  console.log("hello world!!!");
};

function EXPressable() {
  return (
    <Pressable onPress={pressableHandler}>
      <View style={styles.container}>
        <Text>button</Text>
      </View>
    </Pressable>
  );
}

export default EXPressable;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    backgroundColor: "blue",
  },
});
```

```jsx
import { StyleSheet, View } from "react-native";
import EXText from "./components/EXText";
import EXPressable from "./components/EXPressable";

export default function App() {
  return (
    <View style={styles.container}>
      <EXPressable />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
});
```

### Button

- `Button` 컴포넌트를 클릭하면 정의된 이벤트가 실행
- `Pressable` 컴포넌트와 차이점
  - `Button` 은 정의된 스타일이 존재하여 하위 컴포넌트가 필요하지 x
  - `Pressable` 은 하위 컴포넌트가 필요
- `Button` 의 스타일이 어플리케이션과 맞지 않을 경우 `Pressable` 을 사용하여 버튼을 생성

### Button 예시 코드

```jsx
import { Button } from "react-native";

const buttonHandler = () => {
  console.log("hello word!!!");
};

function EXButton(props) {
  return <Button title="Button" onPress={buttonHandler} />;
}

export default EXButton;
```

```jsx
import { StyleSheet, View } from "react-native";
import EXText from "./components/EXText";
import EXPressable from "./components/EXPressable";
import EXButton from "./components/EXButton";

export default function App() {
  return (
    <View style={styles.container}>
      <EXButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
});
```

### Ionicons

- expo 프로젝트에 내장되어 있는 `@expo/vector-icons/Ionicons` 라이브러리의 컴포넌트
- 내장 아이콘을 사용할 수 있음
- icon의 종류는 다음 링크에서 확인
  - https://icons.expo.fyi/Index

### Ionicons 예시 코드

```jsx
import Ionicons from "@expo/vector-icons/Ionicons";

function EXIcon(props) {
  return <Ionicons name="star" size={100} color="yellow" />;
}

export default EXIcon;
```

```jsx
import { StyleSheet, View } from "react-native";
import EXText from "./components/EXText";
import EXPressable from "./components/EXPressable";
import EXButton from "./components/EXButton";
import EXIcon from "./components/EXIcon";

export default function App() {
  return (
    <View style={styles.container}>
      <EXIcon />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
});
```

### FlatList

- 목록을 표시하고 스크롤할 수 있는 컴포넌트
- 대량의 데이터를 효율적으로 관리하고, 화면에 보이는 항목만 렌더링하여 성능을 최적화
- 각 항목에 대한 `key` 를 설정해야 함
  - 목록에서 변경된 항목을 더 효율적으로 식별
- 주요 프로퍼티
  - `data` : 표시할 데이터 배열
  - `renderItem` : 각 데이터 항목에 대한 렌더링 함수
  - `keyExtractor` : 각 항목의 고유한 키를 추출하는 함수 지정

### FlatList 예시 코드

```jsx
import { FlatList, StyleSheet, Text, View } from "react-native";

const DATA = [
  {
    id: 1,
    title: "Item 1",
  },
  {
    id: 2,
    title: "Item 2",
  },
  {
    id: 3,
    title: "Item 3",
  },
  {
    id: 4,
    title: "Item 4",
  },
  {
    id: 5,
    title: "Item 5",
  },
  {
    id: 6,
    title: "Item 6",
  },
];

const Item = ({ item }) => {
  return (
    <View style={styles.childContainer}>
      <Text>{item.title}</Text>
    </View>
  );
};

function EXFlatList() {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={Item}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default EXFlatList;

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    backgroundColor: "grey",
  },
  childContainer: {
    height: 30,
    backgroundColor: "white",
    margin: 10,
  },
});
```

```jsx
import { StyleSheet, View } from "react-native";
import EXText from "./components/EXText";
import EXPressable from "./components/EXPressable";
import EXButton from "./components/EXButton";
import EXIcon from "./components/EXIcon";
import EXFlatList from "./components/EXFlatList";

export default function App() {
  return (
    <View style={styles.container}>
      <EXFlatList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
});
```
