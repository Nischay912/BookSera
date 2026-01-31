import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { Link } from 'expo-router'
import { useState } from 'react';

// step255: lets get the styles for the login screen, first thus here below.
import styles from '../../assets/styles/login.styles';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import { useAuthStore } from '../../store/authStore';

export default function Login () {
  // step256: now lets make the states for the email, password as well as to show password here below , to click on eye icon there and the loading state, thus here below.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // by default false as we don't want password to be visible by default , only visible when eye icon is clicked, thus here below.

  // step372: again lets not have the loading state defined here, but lets grab it from the auth store, thus here below.
  // const [isLoading, setIsLoading] = useState(false); // by default false as we don't want to show loading screen by default, thus here below.

  // step373: lets get all the needed states and functions from the auth store, thus here below.

  // step628: now lets get the isCheckingAuth state from the auth store, thus here below.
  const {isLoading, login, isCheckingAuth} = useAuthStore();

  const handleLogin = async () => {
    // step374: now lets get the thing we returned when calling the login function in the auth store, thus here below.
    const result = await login(email, password);

    // step375: then based on what it returned i.e. the success message it returned ther ein auth store is either true orf alse, based on that, we show the alert popup on the screen of the mobile, thus here below.'

    // step376: now we can test the login button and get invalid credentials error if wrong email password ; else we will get logged in and the user and token will be logged in the console there, thus here below.

    // step377: see the next steps in step378.txt file now there.

    if(!result.success){ // i.e. if the success message returned by the login function in the auth store is false (!true = false), thus here below.
      Alert.alert("Error", result.error);
    }
  }

  // step629: then when we are checking for authentication, then we return null here ; its because if the app when reloaded checks for authentication, then no need to show anything like the login screen there for a split second, rather return NULL there, i.e. nothing shown and then like done in AuthStore in finally block once app loaded, and authentication check done, this isCheckingAuth state becomes false again, we did in previous steps and so we get back the components of home screen rendered there now, thus here below.

  /*
  So here : if return null is not there then -

  " // no guard
    return <LoginScreen /> "

  App starts
  token = null (initial)
  → Login screen shows
  → then token loads from storage
  → suddenly redirect to home ; screen flickers 

  ; but if we use return null here, then -

    App starts
    isCheckingAuth = true
    → render NOTHING

    checkAuth finishes
    isCheckingAuth = false

    NOW render login or home correctly
  */

    //  CAN EVEN SHOW SPINNER TOO FROM THE LOADER.JSX FILE IMPORT <LOADER /> AND RETURN LOADER, THUS HERE BELWO TOO, IT WILL ALSO WORK INSTEAD OF REDIRECTING TO LOGIN FOR A SMALL TIME AND FLICKERING THE SCREEN THERE, THUS HERE BELOW i.e. :

      // if(isCheckingAuth){
      //   return <Loader />
      // }

  // step630: see the next steps in step631.txt file now there.
  if(isCheckingAuth) return null;

  return (
    // step276: we had a problem that the keyboard was oveerlapping the input fields there, making it difficult to see what we are typing there ; so to fix that we use the KeyboardAvoidingView component from react-native, thus here below.

    // step277: so this : automatically moves your screen up when the keyboard appears, so your input fields do NOT get hidden behind the keyboard ; if not used : On iOS/Android, when keyboard opens, your TextInput can get covered.
    <KeyboardAvoidingView
      style={{flex: 1}}  // takes all available space on the screen / screen space

      // step278: now we use the below code to see its which platform ; ios, android or web ; and then by rule it works like this only that if on ios ; we use padding behaviour (Adds padding to the bottom and pushes the whole UI up smoothly) to move the screen when the keyboard clicked or appears there ; and height behaviour (Reduces the height of the screen smoothly, when keyboard appears) if on android or web, thus here below.

      // step279: now see the next steps in signup.jsx file now there.
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

      {/* // step257: now lets build the UI, thus here below. */}
      <View style={styles.container}>
        {/* step258: now lets have the image for the login page, thus here below. */}
        <View style={styles.topIllustration}>
          <Image
            source={require('../../assets/images/login.png')}
            style={styles.illustrationImage}
            resizeMode='contain' // Keep original aspect ratio (no stretching) ; Make image fit completely inside the area, without cropping it, thus here below.
          />
        </View>

        {/* step259: now lets have the form container for the login page, thus here below. */}
        <View style={styles.card}>
          <View style={styles.formContainer}>
            {/* step260: now lets make the input tags for email and password, thus here below. */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name='mail-outline'
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />

                {/* step261: in react native ; the input tag is given by the TextInput component, thus here below. */}
                <TextInput
                  style={styles.input}
                  placeholder='Enter your email'
                  placeholderTextColor={COLORS.placeholderText}

                  // step262: so the value of this input field will always be equal to the email state, thus here below.
                  value={email}

                  // step263: whenever user types here, the value of this changes, so we call the setEmail function to update the email state too on change of value, as we saw above that the value of this input field will always be equal to the email state, thus here below.
                  onChangeText={setEmail}

                  // step264: have many options can explore it by pressing ctrl + space when typing here below like number-pad , etc : lets use email-address, thus here below.
                  keyboardType='email-address'

                  // step265: now we don't want to capitalize the 1st leteer of a word on pressing space automatically, so lets set it to none, thus here below.
                  autoCapitalize='none'
                />
              </View>
            </View>
            {/* step266: now similarly, lets make the input field for password, thus here below. */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                {/* step267: now in this input tag ; we want to have the lock icon on the left, thus here below. */}
                <Ionicons
                  name='lock-closed-outline'
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Enter your password'
                  placeholderTextColor={COLORS.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  // step268: secureTextEntry tells that when its true, then it shows hidden password, else shows visible password there ; so if showpassword is true means it has to show password and not secure i.e. make it !true = false and vice versa ; thats why "!" is used here below, thus here below.
                  secureTextEntry={!showPassword}
                />
                {/* step269: now in this input tag ; we want to have the eye icon on the right, but since its a button; so in react-native we use <TouchableOpacity> component for buttons, thus here below. */}
                <TouchableOpacity
                  // step270: so on pressing it ; we make the show password to be true or flase i.e. show password or not, thus here below.
                  onPress={() => setShowPassword(!showPassword)}  
                  style={styles.eyeIcon}
                >
                  {/* step271: now we will show open or closed eye icon depending on if the showPassword is true or false, thus here below. */}
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* step272: now lets have the Login button now, thus here below. */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              // step273: we disable this button when the loading state is true, thus here below.
              disabled={isLoading}
            >
              {/* step274: if the loading state is true, then we will see the activituy indicator inside the button, which is a rotating circle of color "#fff", CAN CHECK IT BY CHANGING CONDITION TO "TRUE" HERE BELOW ; else if not in loading state, then we will show the text, thus here below.  */}
              {isLoading ? (
                <ActivityIndicator color='#fff' />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            {/* step275: now lets have the text with the link to signup page now, thus here below. */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              
              {/* because of "asChild", Link doesn't gets rendered seperately, but makes its child i.e. the button as full as a link component and clicking on whole button anywhere will take us to the signup page there, thus here below ; so : The TouchableOpacity becomes a clickable “Sign up” button that navigates to /signup, because the <Link> passes its navigation behavior to the child due to asChild. */}
              <Link href='/signup' asChild> 
                <TouchableOpacity>
                  <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}