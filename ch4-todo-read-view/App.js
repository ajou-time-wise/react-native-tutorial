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
