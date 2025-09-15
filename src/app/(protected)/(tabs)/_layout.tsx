import { Tabs } from "expo-router";
import {
  Home,
  Inbox,
  LogOut,
  MessageCircle,
  Plus,
  Users,
} from "lucide-react-native";
import tw from "twrnc";
import { useAuth } from "@clerk/clerk-expo";

export default function TabsLayout() {
  const { signOut } = useAuth();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ff5700",
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
        headerRight: () => (
          <LogOut size={30} style={tw`mx-4`} onPress={() => signOut()} />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "Reddit",
          headerTitleAlign: "center",
          headerTintColor: "#ff5700",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerTitle: "Chat Screen",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => <MessageCircle size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerTitle: "Create Screen",
          headerShown: false,
          tabBarStyle: { display: "none" },
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => <Plus size={25} color={color} />,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          headerTitle: "Community Screen",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => <Users size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
          headerTitle: "Inbox Screen",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => <Inbox size={25} color={color} />,
        }}
      />
    </Tabs>
  );
}
