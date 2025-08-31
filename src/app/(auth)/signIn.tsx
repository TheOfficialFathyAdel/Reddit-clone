import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Snackbar } from "react-native-paper";
import React from "react";
import tw from "twrnc";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string>("");
  const [visible, setVisible] = React.useState(false);

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      if (err instanceof Error) {
        setError(err.message);
        setVisible(true);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <View style={tw`flex-1 items-center justify-center bg-white`}>
      <View style={tw`w-80% items-center mb-10`}>
        <Text style={tw`text-3xl text-gray-700 font-bold`}>Sign In</Text>
        <TextInput
          style={tw`border border-2 border-gray-400 w-full mt-4 text-lg font-bold pl-4 rounded-lg`}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
        <TextInput
          style={tw`border border-2 border-gray-400 w-full mt-4 text-lg font-bold pl-4 rounded-lg`}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity
          style={tw`bg-blue-500 rounded-full px-10 py-3 mt-3`}
          onPress={onSignInPress}
        >
          <Text style={tw`text-white text-lg font-bold`}>SignIn</Text>
        </TouchableOpacity>
        <View style={tw`flex-row items-center gap-2 mt-3`}>
          <Text style={tw`text-lg font-bold text-gray-700`}>
            Don't have an account?
          </Text>
          <Link href="/signup">
            <Text style={tw`text-lg font-bold text-blue-500`}>Sign up</Text>
          </Link>
        </View>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
        action={{
          label: "Undo",
          onPress: () => {
            setVisible(false);
          },
        }}
      >
        {error}
      </Snackbar>
    </View>
  );
}
