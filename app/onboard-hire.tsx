import { Pressable, SafeAreaView, Text, TextInput, View } from "react-native"
import { styleTypography } from "../styles/typography"
import Button from "../components/Button"
import { useState } from "react";
import { formStyles } from "../styles/form";
import { colors } from "../styles/color";

export default function OnboardHirePage({ navigation }) {
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
        <Text style={{ ...styleTypography.heading, textAlign: 'center' }}>When were you hired?</Text>

        <Text style={{ ...styleTypography.body, textAlign: 'center' }}>We’ll remind you about work anniversaries and celebrate with you.</Text>

        <TextInput
          onChangeText={onChangeText}
          value={text}
          placeholder="Hire date"
          style={formStyles.input}
        />

        <Button
          onPress={() => navigation.replace('Homepage')}
          label="Continue"
        />

        <View style={{
          gap: 16,
        }}>
          <Pressable
            style={{
            marginHorizontal: 'auto',
          }}
          onPress={() => navigation.replace('OnboardHirePage')}
          >
            <Text style={{
              color: "#122A47",
              fontSize: 14,
              fontWeight: 500,
            }}>Skip for now</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  </View>
}
