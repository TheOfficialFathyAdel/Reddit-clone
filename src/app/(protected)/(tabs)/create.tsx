import { router } from "expo-router";
import { X } from "lucide-react-native";
import { useState } from "react";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import tw from "twrnc";

export default function CreateScreen() {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const goBack = () => {
    router.back();
    setTitle("");
    setBody("");
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-white px-5`}>
      {/* Header */}
      <View style={tw`flex-row justify-between items-center mt-5`}>
        <X size={33} onPress={() => goBack()} />
        <TouchableOpacity
          style={tw`bg-blue-500 h-10 w-17 shadow-lg rounded-full flex items-center justify-center`}
          activeOpacity={0.8}
        >
          <Text style={tw`text-white font-bold text-lg `}>Post</Text>
        </TouchableOpacity>
      </View>
      {/* Community Selector */}
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}
        extraScrollHeight={Platform.OS === "ios" ? 100 : 120}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={tw`flex-row bg-gray-200 gap-2 px-6 py-4 rounded-full self-start mt-4`}
        >
          <View style={tw`bg-black h-6 px-3 rounded-full`}>
            <Text style={tw`text-base font-bold text-white text-center`}>
              /r
            </Text>
          </View>
          <Text style={tw`text-base font-bold`}>Select Community</Text>
        </View>
        <TextInput
          value={title}
          style={tw`font-bold text-3xl mt-3`}
          placeholder="Title"
          onChangeText={setTitle}
          multiline
        />
        <TextInput
          value={body}
          style={tw`font-bold text-lg`}
          placeholder="body text (optional)"
          onChangeText={setBody}
          multiline
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
