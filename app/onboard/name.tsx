import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native"
import { styleTypography } from "../../styles/typography"
import Button from "../../components/Button"
import { useEffect, useState } from "react";
import { formStyles } from "../../styles/form";
import { colors } from "../../styles/color";
import { getFromSecureStore, saveToSecureStore } from "../../utilities/secure-store";
import { styleOnboard } from "styles/layout";

export default function OnboardNamePage({ navigation }) {
  const [name, setName] = useState<string>('');

  const handleContinue = async () => {
    navigation.navigate('OnboardSalaryPage');
    await saveToSecureStore('firstName', name);
  }

  useEffect(() => {
    const initAsync = async () => {
      const nameFromSecureStore = await getFromSecureStore('firstName')
      setName(nameFromSecureStore);
    }
    initAsync();
  }, []);

  return <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.canvas,
    }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          ...styleOnboard.container,
          height: '100%',
          padding: 20,
          gap: 32,
        }}>
        <Text style={{ ...styleTypography.heading, textAlign: 'center' }}>What's your first name?</Text>

        <Text style={{ ...styleTypography.body, textAlign: 'center' }}>Your name will be displayed in your earning reminders.</Text>

        <TextInput
          onChangeText={setName}
          value={name}
          placeholder="Name"
          style={formStyles.input}
          maxLength={20}
        />

        <View style={{
          marginBottom: 16,
          marginTop: 'auto',
        }}>
          <Button
            disabled={!name.length}
            onPress={handleContinue}
            label="Continue"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  </TouchableWithoutFeedback>
}
