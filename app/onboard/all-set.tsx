import { SafeAreaView, Text, View } from "react-native"
import { styleTypography } from "../../styles/typography"
import Button from "../../components/Button"
import { colors } from "../../styles/color";
import { saveToSecureStore } from "../../utilities/secure-store";

export default function OnboardHirePage({ navigation }) {

  const handleContinue = async () => {
    saveToSecureStore('onboardingComplete', 'true');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Homepage' }],
    });
  }

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
        <Text style={{ ...styleTypography.heading, textAlign: 'center' }}>You’re all set!</Text>

        <Text style={{ ...styleTypography.body, textAlign: 'center' }}>Little boosts of positivity will start rolling in. Get ready to change your attitude and outlook about being a working professional!</Text>

        <View style={{
          marginTop: 'auto',
          gap: 16,
        }}>
          <Button
            onPress={handleContinue}
            label="Finish setup"
          />
        </View>
      </View>
    </SafeAreaView>
  </View>
}
