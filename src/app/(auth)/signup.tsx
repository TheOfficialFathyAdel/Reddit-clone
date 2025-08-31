import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Snackbar } from "react-native-paper";
import tw from "twrnc";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [error, setError] = React.useState<string>("");
  const [visible, setVisible] = React.useState(false);
  const [code, setCode] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    console.log(emailAddress, password);

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      if (err instanceof Error) {
        setError(err.message);
        setVisible(true);
      } else {
        console.log("An unknown error occurred.");
      }
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-white`}>
        <View style={tw`w-90% items-center`}>
          <Text style={tw`text-3xl text-gray-700 font-bold`}>
            Verify your email
          </Text>
          <TextInput
            style={tw`border border-2 border-gray-400 w-full mt-4 text-lg font-bold pl-2 rounded-lg`}
            value={code}
            placeholder="Verification Code"
            onChangeText={(code) => setCode(code)}
          />
          <TouchableOpacity
            onPress={onVerifyPress}
            style={tw`bg-blue-500 rounded-full px-10 py-3 mt-3`}
          >
            <Text style={tw`text-white text-lg font-bold`}>Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 items-center justify-center bg-white`}>
      <View style={tw`w-80% items-center mb-10`}>
        <Text style={tw`text-3xl text-gray-700 font-bold`}>Sign up</Text>

        <TextInput
          style={tw`border border-2 border-gray-400 w-full mt-4 text-lg font-bold pl-2 rounded-lg`}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email"
          onChangeText={(email) => setEmailAddress(email)}
        />
        <TextInput
          style={tw`border border-2 border-gray-400 w-full mt-4 text-lg font-bold pl-2 rounded-lg`}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity
          style={tw`bg-blue-500 rounded-full px-10 py-3 mt-3`}
          onPress={onSignUpPress}
        >
          <Text style={tw`text-white text-lg font-bold`}>Signup</Text>
        </TouchableOpacity>
        <View style={tw`flex-row items-center gap-2 mt-3`}>
          <Text style={tw`text-base font-bold text-gray-700`}>
            Already have an account?
          </Text>
          <Link href="/signIn">
            <Text style={tw`text-base font-bold text-blue-500`}>Sign in</Text>
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
