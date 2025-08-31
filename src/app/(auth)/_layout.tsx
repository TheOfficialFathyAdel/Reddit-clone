import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AppLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="signIn"
        options={{ title: "Sign In", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="signup"
        options={{ title: "Signup", headerTitleAlign: "center" }}
      />
    </Stack>
  );
}
