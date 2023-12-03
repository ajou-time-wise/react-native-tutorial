import { View } from "react-native";
import { Bar } from "react-native-progress";

function EXBar() {
  return (
    <View>
      <Bar progress={0.5} width={200} height={10} color="blue" />
    </View>
  );
}

export default EXBar;
