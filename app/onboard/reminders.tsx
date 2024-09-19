import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native"
import { styleTypography } from "../../styles/typography"
import Button from "../../components/Button"
import { useEffect, useRef, useState } from "react";
import { colors } from "../../styles/color";
import { getFromSecureStore, saveToSecureStore } from "../../utilities/secure-store";
import Slider from "@react-native-community/slider";
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatTime, parseTimeToDate } from "../../utilities/format";
import { Picker } from "@react-native-picker/picker";
import { Audio } from 'expo-av';
import { styleOnboard } from "styles/layout";

const sounds = {
  positive: require(`@assets/audio/positive.wav`),
  crazy: require(`@assets/audio/crazy.wav`),
  chaching: require(`@assets/audio/chaching.wav`),
};

const initialStartTime = parseTimeToDate('9:00 AM');
const initialEndTime = parseTimeToDate('10:00 PM')

export default function OnboardRemindersPage({ navigation }) {
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);
  const [notificationFrequency, setNotificationFrequency] = useState(5);
  const [soundSelection, setSoundSelection] = useState('positive');
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const isFirstRender = useRef(true);

  async function playSound(soundName: string) {
    const { sound } = await Audio.Sound.createAsync(sounds[soundName]);
    setSound(sound);

    await sound.playAsync();
  }

  const canContinue: boolean = !!startTime && !!endTime && !!notificationFrequency && !!soundSelection;

  const handleContinue = async () => {
    if (startTime >= endTime) {
      alert('End time cannot be before start time');
      return;
    }
    const startTimeInHoursAndMinutes = formatTime(startTime);
    const endTimeInHoursAndMinutes = formatTime(endTime);
    await saveToSecureStore('notificationTimeStart', startTimeInHoursAndMinutes);
    await saveToSecureStore('notificationTimeEnd', endTimeInHoursAndMinutes);
    await saveToSecureStore('notificationFrequency', notificationFrequency.toString());
    await saveToSecureStore('notificationSound', soundSelection);
    navigation.navigate('OnboardAllSetPage');
  }

  useEffect(() => {
    const initAsync = async () => {
      const notificationTimeStartFromSecureStore = await getFromSecureStore('notificationTimeStart');
      const notificationTimeEndFromSecureStore = await getFromSecureStore('notificationTimeEnd');
      const notificationFrequencyFromSecureStore = await getFromSecureStore('notificationFrequency');
      const notificationSoundFromSecureStore = await getFromSecureStore('notificationSound');
      setStartTime(parseTimeToDate(notificationTimeStartFromSecureStore));
      setEndTime(parseTimeToDate(notificationTimeEndFromSecureStore));
      setNotificationFrequency(Number(notificationFrequencyFromSecureStore));
      setSoundSelection(notificationSoundFromSecureStore);
    }
    initAsync();
  }, []);

  useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      playSound(soundSelection);
    }
  }, [soundSelection])

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
        <Text style={{ ...styleTypography.heading, textAlign: 'center' }}>Next, let’s setup your daily reminders</Text>

        <Text style={{ ...styleTypography.body, textAlign: 'center' }}>Small doses of earning motivation can make a big difference in your work and personal life.</Text>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Text>Start at</Text>

          <DateTimePicker
            value={startTime}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={(e, value) => setStartTime(value)}
            style={{
              alignSelf: 'center'
            }}
            minuteInterval={15}
          />
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Text>End at</Text>

          <DateTimePicker
            value={endTime}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={(e, value) => setEndTime(value)}
            style={{
              alignSelf: 'center'
            }}
            minuteInterval={15}
          />
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}>
          <Text style={{
            fontWeight: '500',
            fontSize: 16,
          }}>How many</Text>
          <Text style={{
            fontSize: 16,
          }}>{notificationFrequency}x</Text>
        </View>

        <Slider
          style={{ height: 40 }}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={notificationFrequency}
          onValueChange={setNotificationFrequency}
        />

        <View>
          <Text style={{
            fontWeight: '500',
            fontSize: 16,
          }}>Sound</Text>

          <Picker
            selectedValue={soundSelection}
            onValueChange={(itemValue) => setSoundSelection(itemValue)}
          >
            <Picker.Item label="Positive" value="positive" />
            <Picker.Item label="Crazy!" value="crazy" />
            <Picker.Item label="Chaching" value="chaching" />
          </Picker>
        </View>

        <View style={{
          marginBottom: 16,
          marginTop: 'auto',
        }}>
          <Button
            disabled={!canContinue}
            onPress={handleContinue}
            label="Allow and save"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  </TouchableWithoutFeedback>
}
