//  ALWAYS TYPE "RNF" FOR REACT-NATIVE EXPORT COMPONENT AND "RCF" FOR WEB-DEV VALA REACT COMPONENT AND FINALLY PRESS ENTER TO GET THE BOILER PLATE, THUS HERE BELOW.
import { View, Text } from 'react-native'
import React from 'react'
import { useAuthStore } from '../store/authStore';
import styles from '../assets/styles/profile.styles';
import { Image } from 'expo-image';
import { formatMemberSince } from "../lib/utils"

export default function ProfileHeader() {
    // step560: lets first get the user data from the store, thus here below.
    const { user } = useAuthStore();

    // step576: earlier app was crashing on clicking logout , as clicking logout was making user as null, and so the user was becoming slowly to the login screen on clicking logout and by the time it happens, the user already ebcomes ull and so the below code of user.profileImage and all meant there that : null.profileImage and caused errors, so we instead return from here as soon as user becomes null, to prvent the app from crashing, thus here below.

    // step577: see the next steps in profile.jsx file now there, thus here below.
    if(!user){
      return null;
    }
    return (
    <View style={styles.profileHeader}>
        {/* step561: we have the "user" object and token in the AuthStore , so we from that user object stored in database, get the profileImage and other details of the user, thus here below. */}
      <Image source={{ uri : user.profileImage }} style={styles.profileImage} />
      <View style={styles.profileInfo}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>

        {/* step562: it shows INVALID DATE HERE, because we didn't send the createdAt from backend in response, like in authRoutes.js file of backend , we only have : res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage
            }
        }) ; so we will now add to send the createdAt too, thus here below. */}

        {/* step563: so see the next steps in authRoutes.js file of backend now there, thus here below. */}
        <Text style={styles.memberSince}>🗓️ Member since {formatMemberSince(user.createdAt)}</Text>
      </View>
    </View>
  )
}