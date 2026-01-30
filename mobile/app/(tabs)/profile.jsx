import { View, Text } from 'react-native'
import React, { useState } from 'react'

export default function Profile() {
  // step548: lets first write all the states needed to be used in this file, thus here below.

  const [books, setBooks] = useState([]) // to store all the book recommendations of the user

  // step549: the below states with same functionality that we implemented in index.jsx file of this (tabs) folder ; can see there for refernce if needed, thus here below.
  11:16:15
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  return (
    <View>
      <Text>Profile</Text>
    </View>
  )
}