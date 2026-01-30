import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'

// step537: we can now take "size" as a prop from wherever it will be called and thus render that size spinner ; default value if no parameter passed is set to "large", thus here below.

// step538: see the next steps in index.jsx file now there, thus here below.

export default function Loader({size = "large"}) {
  return (
    <View 
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.background
        }}
      >
        <ActivityIndicator size={size} color={COLORS.primary} />
      </View>
  )
}