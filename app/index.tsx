import { SafeAreaView, Text, View } from "react-native"
import { styleTypography } from "styles/typography"

export default function Homepage() {
  return <SafeAreaView>
    <View style={{ padding: 20 }}>
      <Text style={styleTypography.heading}>This is lemonpaid!</Text>
    </View>
  </SafeAreaView>
}
