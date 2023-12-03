import { Button } from "react-native";

const buttonHandler = () => {
  console.log("hello word!!!");
};

function EXButton(props) {
  return <Button title="Button" onPress={buttonHandler} />;
}

export default EXButton;
