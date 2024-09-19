import { Text, View, Image, SafeAreaView } from 'react-native';
import * as Notifications from 'expo-notifications';
import { styleTypography } from '../styles/typography';
import Button from '../components/Button';
import { colors } from '../styles/color';

export default function OneStepAtATimePage({ navigation }) {
  const sendNotification = () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Look at that notification',
        body: "I'm so proud of myself!",
      },
      trigger: null,
    });
  }

  return <View
    style={{
      backgroundColor: colors.canvas,
      height: '100%',
    }}>
    <Image
      source={require('../assets/images/onboard-2.png')}
      style={{
        width: '100%',
        maxWidth: '100%',
      }}
    />
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 20,
          gap: 32,
          flex: 1,
        }}>
        <Text style={styleTypography.heading}>Let’s take it one step at a time.</Text>

        <Text style={styleTypography.body}>Tell us a little bit about yourself and your salary, and then choose how you’d like to receive reminders.</Text>

        <Button
          onPress={() => navigation.replace('OnboardNamePage')}
          label="Continue"
        />
      </View>
    </SafeAreaView>
  </View>;
}
