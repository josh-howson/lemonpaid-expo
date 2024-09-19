import { Pressable, Text } from "react-native";
import { styleButton } from "../styles/button";

type Props = {
  onPress: () => void;
  label: string;
  disabled?: boolean;
};

export default function Button({
  onPress,
  label,
  disabled = false,
}: Props) {
  return <Pressable
    disabled={disabled}
    onPress={onPress}
    style={disabled ? styleButton.pressableDisabled : styleButton.pressable}
  >
    <Text
      style={styleButton.text}>
      {label}
    </Text>
  </Pressable>
}
