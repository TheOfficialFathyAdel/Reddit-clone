import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

export default function CreateScreen() {
  return (
    <SafeAreaView>
      <Text style={tw`text-xl font-bold`}>Create Screen</Text>
    </SafeAreaView>
  );
}
