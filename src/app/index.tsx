import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text style={tw`text-4xl font-bold`}>Hello world</Text>
    </SafeAreaView>
  );
}
