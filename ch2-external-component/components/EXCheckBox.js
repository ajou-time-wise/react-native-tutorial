import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Text, View } from "react-native";

function EXCheckBox() {
  const [isComplete, setIsComplete] = useState(false);
  return (
    <View>
      <Checkbox
        value={isComplete}
        onValueChange={() => setIsComplete(!isComplete)}
      />
      <Text>{isComplete ? "true" : "false"}</Text>
    </View>
  );
}

export default EXCheckBox;
