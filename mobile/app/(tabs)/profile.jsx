import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { API_URL } from '../../constants/api'

// NOTE HERE THAT : WE CAN ALWAYS CHECK IF PATH IS CORRECT OR NOT BY DOUBLE CLICKING THE '../../store/authStore' BELOW AND THEN PRESS CTRL+SPACE, IF ITS CORRECT, IT WILL SHOW THE PATH TO THE FILE, thus here below.
import { useAuthStore } from '../../store/authStore'
import styles from "../../assets/styles/profile.styles"
import ProfileHeader from '../../components/ProfileHeader'
import LogoutButton from '../../components/LogoutButton'

export default function Profile() {
  // step548: lets first write all the states needed to be used in this file, thus here below.

  const [books, setBooks] = useState([]) // to store all the book recommendations of the user

  // step549: the below states with same functionality that we implemented in index.jsx file of this (tabs) folder ; can see there for refernce if needed, thus here below.
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // TOKEN TO BE USED TO SEND WITH REQUEST IN AUTHORIZATION HEADER, TO CHECK IF THE LOGGED IN USER MATCHES WITH THAT AUTHORIZED TOKEN OR NOT, AND THEN ONLY FETCH THE DATA FOR PROTECTION AND SECURITY REASONS, thus here below.
  const { token } = useAuthStore();

  // step550: lets also get the router to be used to navigate between screens, thus here below.
  const router = useRouter();

  // step551: now lets write the function to fetch the data from the database, thus here below.
  const fetchData = async () => {
    try {
      // step552: now first when loading the data, we set loading true, to show the loading spinner there, thus here below.
      setIsLoading(true)

      // step553: then we send a request to the user endpoint with the Authorization header, which is a built-in header in fetch API, to tell the server we are authenticated by sending the logged in user token for authentication and security purposes there, thus here below.
      const response = await fetch(`${API_URL}/books/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      // step554: then we get the data parsed to json format back and then check using response.ok if the request was successful or not, thus here below.
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.messsage || "Failed to fetch the user's books")
      }

      // step555: else if successful, then we update the books state with the data, thus here below.
      setBooks(data)
    } 
    catch (error) {
      console.log("Error in fetching the user's books", error);
      Alert.alert("Error", "Failed to load profile data. Pull down to refresh.");
    }

    // step556: and then we set back the loading state to false in a finally block because even if control was in try or catch, but still at the end we want to stop the loading spinner there, so set back the loading to false in finally block, as by rule finally block runs regardless of try or catch block, thus here below.
    finally {
      setIsLoading(false)
    }
  }

  // step557: now we will be calling this function, when the screen is rendered for the first time only once, so use an useEffect with empty dependency array, thus here below.
  useEffect(() => {
    fetchData();
  }, []);

  return (
    // step558: now lets write the UI for this screen, thus here below.
    <View style={styles.container}>
      {/* step559: so we will make seperate components for the profile header and logout button, thus here below ; so see the next steps in ProfileHeader.jsx and LogoutButton.jsx files now there. */}
      <ProfileHeader />
      <LogoutButton />
    </View>
  )
}