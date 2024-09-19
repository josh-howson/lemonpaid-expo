import { Pressable, Text } from "react-native";
import { styleButton } from "../styles/button";

type Props = {
  onPress: () => void;
  label: string;
}

export default function Button({
  onPress,
  label,
}: Props) {
  return <Pressable
    onPress={onPress}
    style={styleButton.pressable}
  >
    <Text
      style={styleButton.text}>
      {label}
    </Text>
  </Pressable>
}
