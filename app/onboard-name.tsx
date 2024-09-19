import { ImageBackground, SafeAreaView, Text, TextInput, View } from "react-native"
import { styleTypography } from "../styles/typography"
import Button from "../components/Button"
import { useState } from "react";
import { formStyles } from "../styles/form";
import { colors } from "../styles/color";

export default function OnboardNamePage({ navigation }) {
  const [text, onChangeText] = useState('');
  return <View
    style={{
      backgroundColor: colors.canvas,
      height: '100%',
    }}>
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 20,
          gap: 32,
          flex: 1,
        }}>
        <Text style={{ ...styleTypography.heading, textAlign: 'center' }}>What's your first name?</Text>

        <Text style={{ ...styleTypography.body, textAlign: 'center' }}>Your name will be displayed in your earning reminders</Text>

        <TextInput
          onChangeText={onChangeText}
          value={text}
          placeholder="Name"
          style={formStyles.input}
        />

        <Button
          onPress={() => navigation.replace('OnboardSalaryPage')}
          label="Continue"
        />
      </View>
    </SafeAreaView>
  </View>
}
