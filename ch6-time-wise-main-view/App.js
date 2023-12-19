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
