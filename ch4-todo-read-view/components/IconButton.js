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
