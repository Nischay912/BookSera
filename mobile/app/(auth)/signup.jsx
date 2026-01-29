import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import styles from '../../assets/styles/signup.styles'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '../../constants/colors'
import { useRouter } from 'expo-router'
import { useAuthStore } from '../../store/authStore'

export default function Signup () {

  // step286: we made the states same as done in index.jsx file of this (auth) folder ; can see there for refernce if needed, thus here below.
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // step303: lets call the useAuthStore hook here below, to use the states and functions of that zustand store in this file, thus here below.

  // step304: so we can get the states and functions we want from the store to be used here ; in the following syntax, thus here below.
  // const { user, sayHello, setUser } = useAuthStore();
  const { user, isLoading, register, token } = useAuthStore();

  // step305: now lets console log this below to see the "user" state here below.
  // console.log("Here is the user", user);

  const router = useRouter();

  const handleSignUp = async () => {
    // step306: for testing purpose, lets call the sayHello function here below to see if its working or not, thus here below.

    // sayHello(); // will see the console log of the function running there in authStore.js file ; hence this is how we can access the states and functions of the zustand store from anywhere in the app, thus here below.

    // setUser({name: "Kumar"}) // since user state in authStore was an object as it was defined there in {....} ; so when updating it ; put as object too thus here below.

    // step307: now see the next steps in authStore.js file now there.

    // step335: now lets get the result response returned by the register function calling, thus here below.
    const result = await register(username, email, password);

    // step336: now based on what was returned, lets throw an Alert popup on the screen there, thus here below ; using the "Alert" component of react-native, thus here below.

    // step337: see the next steps in step338.txt file now there.
    if(!result.success){
      Alert.alert(
        "Error", // title of the alert popup
        result.error, // body of the alert popup
        /*[
          {
            text: "Dismiss", // button text (can comment out this too if we want react native to give the button's text by default there like OK or CANCEL, etc : thus here below).
          }
        ]*/
      )
    }

    // can do these console logs for testing purposes as after user is signed up and logged in ; user and token now wont be null or undefined and printyed with proper value in console, thus here below.
    console.log("Signed up User", user);
    console.log("Token of the signed up user", token);
  }

  return (
    // step280: we like done in login page here also put the KeyboardAvoidingView component to move the screen up when the keyboard appears there, so that the input fields do NOT get hidden behind the keyboard ; thus here below.
    <KeyboardAvoidingView
      style={{flex: 1}}  // takes all available space on the screen / screen space
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* step281: now lets build the UI of the page, thus here below. */}
      <View style={styles.container}>
        <View style={styles.card}>

          {/* step282: now lets have the header of the signup page, thus here below. */}
          <View style={styles.header}>
            <Text style={styles.title}>BookSera🛸</Text>
            <Text style={styles.subtitle}>Share your favorite books around instantly</Text>
          </View>

          {/* step283: now lets create the form container, thus here below. */}
          <View style={styles.formContainer}>

            {/* step284: now first lets have the username input tag using <TextInput /> component which is used in react-native instead of <input /> in web apps, thus here below. */}

            {/* step285: built using same logic as done in index.jsx file of this (auth) folder ; can see there for refernce if needed, thus here below. */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name='person-outline'
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder='NischayKr'
                  placeholderTextColor={COLORS.placeholderText}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize='none'
                />
              </View>
            </View>

            {/* step287: now lets similarly have the email input tag using <TextInput /> component which is used in react-native instead of <input /> in web apps, thus here below. */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name='mail-outline'
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder='nischaykumar.dev@gmail.com'
                  placeholderTextColor={COLORS.placeholderText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType='email-address'
                  autoCapitalize='none'
                />
              </View>
            </View>

            {/* step288: now lets similarly have the password input tag using <TextInput /> component which is used in react-native instead of <input /> in web apps, thus here below. */}

            {/* step289: built using same logic as done in index.jsx file of this (auth) folder ; can see there for refernce if needed, thus here below. */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name='lock-closed-outline'
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder='********'
                  placeholderTextColor={COLORS.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            </View> 

            {/* step290: now lets have the signup button, thus here below. */}

            {/* step291: built using same logic as done in index.jsx file of this (auth) folder ; can see there for refernce if needed, thus here below. */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color='#fff' />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            {/* step292: now lets have the login link, thus here below. */}

            {/* step293: built using same logic as done in index.jsx file of this (auth) folder ; can see there for refernce if needed, thus here below. */}

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>

              {/* step294: the router.back() function is used to go back to the previous screen, thus here below. */}

              {/* step295: see the next steps in step296.txt file now there. */}
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}