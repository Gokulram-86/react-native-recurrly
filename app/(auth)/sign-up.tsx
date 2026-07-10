import { View, Text } from 'react-native'
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = () => {
  return (
    <View>
      <Text>SignIn</Text>
      <Link href="/(auth)/sign-up">Sign In</Link>
      <Link href="/">Home</Link>
    </View>
  )
}

export default SignUp