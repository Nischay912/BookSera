// step245: so now lets start by getting boilerplate using the shortcut "rnfe" > ENTER : now thus here below.
import { View, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import COLORS from '../constants/colors'

// step246: so we will be getting children as the prop here below ; where children will be all the content that was wrapped inside this <SafeScreen> component there in _layout.jsx file of root "app" directory folder, thus here below.
export default function SafeScreen({children}) {
    // step248: now lets get the insets from the useSafeAreaInsets hook now thus here below ; It returns how much padding is required at top, bottom, left, and right of the screen to avoid the system status bar, navigation bar, and safe area insets issue thus here below.
    const insets = useSafeAreaInsets()
  return (

    // step250: now we want to implement multiple styles in this View component , so for that we can pass the multiple styles as an array like done below ; where insets.top : automatically uses the useSafeAreaInsets hook and asjusts the padding needed from top to keept the content i.e. the {children} inside the safe area view, thus here below ; also the color of backgorund also reflects in the status bar there because : On Android, if the status bar is transparent (no explicit color set), then the OS shows the background color of the View underneath it ; so since by logic status bar is transparent colored, so it takes the color we give here below of the COLORS.background, thus here below.

    // step251: see the next steps in _layout.jsx file of root "app" directory folder now there.
    <View style={[styles.container, {paddingTop: insets.top}]}>
        {/* step247: and then inside the we will be returning the "children" i.e. the content that was wrapped inside this <SafeScreen> component there in _layout.jsx file of root "app" directory folder, thus here below. */}
      {children}
    </View>
  )
}

// step249: now lets create a stylesheet to use the styles now, thus here below.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    }
})