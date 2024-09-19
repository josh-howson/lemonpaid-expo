import { Pressable, SafeAreaView, Text, View } from "react-native"
import { styleTypography } from "../../styles/typography"
import Button from "../../components/Button"
import { useState } from "react";
import { colors } from "../../styles/color";
import DateTimePicker from '@react-native-community/datetimepicker';
import { saveToSecureStore } from "../../utilities/secure-store";
import { styleOnboard } from "styles/layout";

export default function OnboardHirePage({ navigation }) {
  const [date, setDate] = useState<Date>(new Date());

  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const handleContinue = async () => {
    if (date >= new Date()) {
      alert('Date cannot be in the future');
      return;
    }
    await saveToSecureStore('hireDate', date.toISOString());
    navigation.navigate('OnboardRemindersPage');
  }

  const handleSkip = () => {
    navigation.navigate('OnboardRemindersPage');
  }

  return <View
    style={{
      backgroundColor: colors.canvas,
      height: '100%',
    }}>
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          ...styleOnboard.container,
          padding: 20,
          gap: 32,
          flex: 1,
        }}>
        <Text style={{ ...styleTypography.heading, textAlign: 'center' }}>When were you hired?</Text>

        <Text style={{ ...styleTypography.body, textAlign: 'center' }}>We’ll remind you about work anniversaries and celebrate with you.</Text>

        <View style={{
          alignItems: 'center',
        }}>
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
            maximumDate={new Date()}
          />
        </View>

        <View style={{
          marginTop: 'auto',
          gap: 16,
        }}>
          <Button
            onPress={handleContinue}
            label="Continue"
          />

          <Pressable
            style={{
              marginHorizontal: 'auto',
            }}
            onPress={handleSkip}
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
