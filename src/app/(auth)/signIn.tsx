import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
export default function SignIn() {
  return (
    <SafeAreaView>
      <Text style={tw`text-xl font-bold`}>
        Hello world from signin component
      </Text>
    </SafeAreaView>
  );
}
