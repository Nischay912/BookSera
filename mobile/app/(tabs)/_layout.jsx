import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import COLORS from '../../constants/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function TabLayout() {

  // step406: so lets get this hook first here below, that gives us the insets i.e. the padding needed from top, bottom, left, and right of the screen to avoid the system status bar, navigation bar, and safe area insets issue thus now here below.
  const insets = useSafeAreaInsets();

  return (
    // step379: now here we will be returning a component called <Tabs> coming from expo-router : which is a built-in component that creates a tabbed navigator (usually bottom tabs) where each tab is represented by a <Tabs.Screen /> child that points to a .jsx file present in that (tabs) folder, thus now here below.
    <Tabs
      // step395: now lets add some screen options here below.
      screenOptions={{
        // step396: first lets hide the header from each screen in the tabs screens thus here below.
        headerShown: false,

        // step401: now we can also have the color to be used for tab icons to be changed from default one to the one we want, thus here below.
        tabBarActiveTintColor: COLORS.primary,

        // step402: we can also change the header title style of the screen at top(WILL BE VISIBLE ONCE WE MAKE THE HEADERSHOWN TO BE "TRUE" THERE ABOVE), thus here below.
        headerTitleStyle: {
          color: COLORS.textPrimary,
          fontWeight: "600"
        },
        // step403: using the header shadow we can also give some shadow to the header of the screen at top(WILL BE VISIBLE ONCE WE MAKE THE HEADERSHOWN TO BE "TRUE" THERE ABOVE), thus here below.
        headerShadowVisible: false,

        // step404: we can also change the background color of the tab bar present at bottom, using the code below, thus here below.
        tabBarStyle: {
          backgroundColor: COLORS.cardBackground,
          borderTopWidth: 1,
          borderTopColor: COLORS.border, // gives the color to the border at top of the tab bar section present at bottom of the screen there, thus here below.

          // step405: putting the padding and height may make the tab bar to go out of safe area view there ; so for that we do the same now like done earlier for other things earlier, thus here below.
          paddingTop: 5,
          // height: 60,

          // step407: now lets add some insets to the height too , to keep the height of tab bar section such that it doesn't go out of safe area view, thus now here below.
          height: 60 + insets.bottom,

          // step408: added to give some space to the bottom of the screen but of value equal to the bottom inset , so that it doesn't go out of safe area view, thus now here below.
          paddingBottom: insets.bottom,
        }
      }}
    >
        {/* step380: now wach of these Tabs.Screen components will point to the .jsx files of the (tabs) folder and will refer to the screens to be present in the bottom tabs, thus now here below. */}

        {/* step381: now we have to put name of all equal to the filenames of the .jsx files present in the (tabs) folder now thus now here below. */}

        {/* step382: see the next steps in the _layout.jsx file of the root layout "app" directory folder now there. */}
        <Tabs.Screen name='index'
          // step397: now lets add icon for every tab option coming at bottom there, thus here below.
          options={{
            // step398:this sets the title of that tab option present at bottom for the index.js screen to be "Home", thus now here below.
            title: "Home",
            // step399: now lets add the icon for the tab bar there now, using the following function below, that returns the Ionicon icon to be shown for that tab option, thus now here below.

            // step400: it takes the color and size parameters by default in it, and when we set size={size} and color={color}, it sets the size and color of the icon to the default size and color provided by react-native for the icon, thus now here below.
            tabBarIcon: ({color, size}) => (
              <Ionicons 
                name='home-outline'
                size={size}
                color={color}
              />
            )
            
          }}
        />

        {/* step409: now similarly like done for the above tab icon, lets change the title of that tab icon and icon for the below tabs too, thus here below. */}

        {/* step410: see the next steps now in create.jsx file now there. */}
        <Tabs.Screen name='create' 
          options={{
            title: "Create",
            tabBarIcon: ({color, size}) => (
              <Ionicons 
                name='add-circle-outline'
                size={size}
                color={color}
              />
            )
          }}
        />
        <Tabs.Screen name='profile' 
          options={{
            title: "Profile",
            tabBarIcon: ({color, size}) => (
              <Ionicons 
                name='person-outline'
                size={size}
                color={color}
              />
            )
          }}
        />
    </Tabs>
  )
}