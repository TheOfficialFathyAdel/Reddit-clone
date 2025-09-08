import { Redirect, router, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { View } from "react-native";
import { Ellipsis, Search, SortDescIcon, X } from "lucide-react-native";
import tw from "twrnc";

export default function AppLayout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/signIn"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="post/[id]"
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#ff5700",
          },
          headerLeft: () => (
            <X color={"#fff"} size={25} onPress={() => router.back()} />
          ),
          headerRight: () => {
            return (
              <View style={tw`flex-row gap-2 items-center`}>
                <Search color={"#fff"} size={25} />
                <SortDescIcon color={"#fff"} size={25} />
                <Ellipsis color={"#fff"} size={25} />
              </View>
            );
          },
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
}
