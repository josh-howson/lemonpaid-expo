import { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native"
import { styleTypography } from "../../styles/typography"
import Button from "../../components/Button"
import { formStyles } from "../../styles/form"
import { colors } from "../../styles/color"
import { getFromSecureStore, saveToSecureStore } from "../../utilities/secure-store";
import { styleOnboard } from "styles/layout";

export default function OnboardSalaryPage({ navigation }) {
  const [salary, setSalary] = useState<string>('');


  const handleContinue = async () => {
    if (Number(salary) <= 0) {
      alert('Salary must be greater than $0');
      return;
    }
    await saveToSecureStore('salary', salary);
    navigation.navigate('OnboardHirePage');
  }

  useEffect(() => {
    const initAsync = async () => {
      const salaryFromSecureStore = await getFromSecureStore('salary');
      if (salaryFromSecureStore) setSalary(salaryFromSecureStore);
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
          flex: 1,
          padding: 20,
          gap: 32,
        }}>
        <Text style={{ ...styleTypography.heading, textAlign: 'center' }}>What is your annual salary?</Text>

        <Text style={{ ...styleTypography.body, textAlign: 'center' }}>You can change this anytime. We’ll use this to send you accurate reminders about pay.</Text>

        <TextInput
          onChangeText={setSalary}
          value={salary}
          placeholder="Annual salary"
          style={formStyles.input}
          keyboardType="numeric"
          maxLength={9}
        />

        <View style={{
          marginBottom: 16,
          marginTop: 'auto',
        }}>
          <Button
            disabled={!salary.length}
            onPress={handleContinue}
            label="Continue"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  </TouchableWithoutFeedback>
}
