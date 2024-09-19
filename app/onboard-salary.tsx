import { SafeAreaView, Text, TextInput, View } from "react-native"
import { styleTypography } from "../styles/typography"
import Button from "../components/Button"
import { useState } from "react";
import { formStyles } from "../styles/form";
import { colors } from "../styles/color";

export default function OnboardSalaryPage({ navigation }) {
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
        <Text style={{ ...styleTypography.heading, textAlign: 'center' }}>What is your annual salary?</Text>

        <Text style={{ ...styleTypography.body, textAlign: 'center' }}>You can change this anytime. We’ll use this to send you accurate reminders about pay.</Text>

        <TextInput
          onChangeText={onChangeText}
          value={text}
          placeholder="Annual salary"
          style={formStyles.input}
        />

        <Button
          onPress={() => navigation.navigate('OnboardHirePage')}
          label="Continue"
        />
      </View>
    </SafeAreaView>
  </View>
}
