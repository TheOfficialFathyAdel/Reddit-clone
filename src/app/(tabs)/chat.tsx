import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

export default function ChatScreen() {
  return (
    <SafeAreaView>
      <Text style={tw`text-xl font-bold`}>Chat Screen</Text>
    </SafeAreaView>
  );
}
