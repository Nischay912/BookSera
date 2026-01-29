import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

export default function RootLayout() {
  // step383: now lets get the router using the useRouter function from expo-router now thus here below and also the segment from the useSegment hook from expo-router now thus here below.

  // step384: useRouter() gives you navigation functions so you can move between screens programmatically (without pressing a button or link) ; useRouter() = lets you navigate using JavaScript instead of <Link> ; using router.push("/home") : we can navigate to home page ; then using router.back() : we can go back to previous page ; also router.replace("path") : navigates the user to the given path and replaces the current screen, but it removes the previous screen's history, so now we cannot go back to the previous page ; so it makes us go to a new page but deletes the previous one ; whereas router.push("path") : navigates the user to the given path and adds the current screen's history stack, so we can go back to the previous page too by pressing back there ; so it just moves us forward to a new page, without deleting the previous one ; thus here below.
  const router = useRouter();

  // step385: useSegments() tells you which folder / route-group you are currently inside ; It returns an array of the current route path segments ; if the current folder path is "/app/(tabs)/home.jsx" ; then it prints : ["tabs", "home"] ; thus here below.
  const segments = useSegments();

  // step386: we canc onsole log segments here below and when we go on different screen on the mobile app there ; it will print the current screen's path or route, thus here below ; like if we are in the home login or index.jsx file of the (auth) folder ; then we will get : ['(auth)'] only there : as index.jsx is the entry file so ["(auth)"] is enough to be printed there, no need of ["(auth)", "index"] ; thus here below.
  // console.log("Segments: ", segments);

  // step387: now lets get the states and functions from the useAuthStore hook from the auth store, thus here below.
  const { checkAuth, user, token } = useAuthStore();

  // step388: as soon as we start the application, we want to check if user is authenticated or not using the checkAuth function as this is the _layout file in the root folder,so adding useEffect here means we will be able to check if user is authenticated or not whenever we start the application as it will first run the layout file of the root folder "app" only, thus here below.
  useEffect(() => {checkAuth()}, []) // [] means that : run this function only once when the app starts, thus here below.

  // step389: now lets have one more useEffect to handle the navigation based on the authentication state, thus here below ; and we will run this whenever the user, token or the segments changes, thus here below.
  useEffect(() => {

    // step390: if user is in the auth screen or not can be checked using the 0th index of the array segments return thus here below.
    const inAuthScreen = segments[0] === "(auth)";

    // step391: now if user is signed in or ot can be checked based on if the user or token is null or not, thus here below.
    const isSignedIn = user && token;

    // step392: now if the user is not signed in as in neither in the auth screen, then we take the user to the authentication page using the router.replace function, thus here below.
    if(!isSignedIn && !inAuthScreen){
      router.replace("/(auth)"); // will take to the starting page in the (auth) folder which is the login page named as index.jsx file there.
    }

    // step393: but if the user is signed in and is also in the auth screen, then we take them to the (tabs) folder i.e. to the starting page "index.jsx" in the (tabs) folder, thus here below.

    // step394: see the next steps in _layout.jsx file of (tabs) folder now there.
    else if(isSignedIn && inAuthScreen){
      router.replace("/(tabs)");
    }

  }, [user, token, segments])

  return (
    <SafeAreaProvider>
        <SafeScreen>
        <Stack screenOptions = {{  headerShown: false }}>

          {/* AFTER WE REMOVED INDEX.JSX FROM THE APP DIRECTORY, WE NOW HAVE TO MAKE IT (TABS) HERE NOW AS NOW THE ROUTES ARE THERE IN (TABS) AND (AUTH) FOLDER NOW AND WE NOT HAVE THE INDEX.JSX FILE IN THE APP DIRECTORY NOW, THUS HERE BELOW. */}
          <Stack.Screen name="(tabs)" />

          {/* step242: now lets make the same for the auth folder made there thus now here below. */}

          {/* step243: see the next steps in step244.txt file now there. */}
          <Stack.Screen name="(auth)" />
        </Stack>
        </SafeScreen>
        {/* step252: now the status bar color has been set as per our COLORS.background used in SafeScreen.jsx file , but its very light in color ; so lets fix it here below by using the <StatusBar> component from expo-router, thus here below. */}
        <StatusBar
          // step253: this in-built style of status bar makes the content of the status bar at top to be dark colored and thus now clearly visible there noe, thus here below.

          // step254: see the next steps in index.jsx file i.e. the login file of the (auth) folder, thus now here below.
          style="dark"
        />
    </SafeAreaProvider>
  )
}
