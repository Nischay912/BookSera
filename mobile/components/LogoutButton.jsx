import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useAuthStore } from '../store/authStore'
import styles from '../assets/styles/profile.styles'
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';

export default function LogoutButton() {
  // step568: first lets get the logout function from the AuthStore, thus here below.
  const { logout } = useAuthStore();
  
//   step571: so lets make the confirmLogout function now, thus here below.
  const confirmLogout = () => {
    // step572: we want to see a confirmation message before logging out, thus here below.
    Alert.alert(
        "Logout", // title of the alert popup
        "Are you sure you want to logout?", // description of the alert popup

        // step573: then we can also pass an array as the 3rd parameter, thus here below ; it tells the buttons that we can have in the popup ; so this is basically an array of button objects, thus here below.

        // step574: and the styles here can be "default" for normal button ; "cancel" for highlighted cancel button ; and destructive for "red color" danger buttons, thus here below.

        // step575: see the next steps in profileHeader.jsx file now there.
        [
            {
                text: "Cancel", style: "cancel"
            },
            {
                text: "Logout", onPress: () => logout(), style: "destructive"
            }
        ]
    );
}

  return (
    // step569: we will be making a button for logout now, thus here below.

    // step570: we could have done onPress={logout} directly too, but lets put a check on it by calling the confirmLogout function, thus here below.
    <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
        <Ionicons name = "log-out-outline" size={20} color={COLORS.white} />
        <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  )
}