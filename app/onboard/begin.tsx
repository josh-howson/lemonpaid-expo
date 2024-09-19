import { useEffect, useRef } from 'react';
import { Text, View, Image, Animated, Easing, SafeAreaView} from 'react-native';
import { styleTypography } from '../../styles/typography';
import Button from '../../components/Button';
import { colors } from '../../styles/color';

export default function Homepage({ navigation }) {
  const slideInLeft = useRef(new Animated.Value(-500)).current;
  const slideInRight = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    // animate the images on render
    Animated.stagger(500, [
      Animated.delay(200),
      Animated.timing(slideInLeft, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(slideInRight, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
    ]).start();
  }, [slideInLeft, slideInRight]);

  return <View
    style={{
      backgroundColor: colors.canvas,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
    <Animated.View
      style={{
        transform: [{ translateX: slideInLeft }],
      }}
    >
      <Image
        source={require('@assets/images/onboard-1a.png')}
        style={{
          width: '100%',
          maxWidth: '100%',
        }}
      />
    </Animated.View>
    <Animated.View
      style={{
        transform: [{ translateX: slideInRight }],
      }}
    >
      <Image
        source={require('@assets/images/onboard-1b.png')}
        style={{
          width: '100%',
          maxWidth: '100%',
        }}
      />
    </Animated.View>
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 20,
          gap: 32,
          flex: 1,
        }}>
        <Text style={styleTypography.heading}>Bring back the joy of earning</Text>

        <Text style={styleTypography.body}>Earning a living is noble and exciting. Encourage positive thoughts about your working lifestyle with daily creative reminders about how much money you’re making.</Text>

        <View style={{
          marginTop: 'auto'
        }}>
          <Button
            onPress={() => navigation.navigate('OneStepAtATime')}
            label="Get started"
          />
        </View>
      </View>
    </SafeAreaView>
  </View>
}
