import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP } from 'react-native-responsive-screen'

type AppTextContentProps = {
  value: string,
}

export default function AppTextContent({value}: AppTextContentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.contentText}>
        {value}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  contentText: {
    fontSize: widthPercentageToDP(4),
    textAlign: 'justify',
  },
  container: {
    paddingVertical: widthPercentageToDP(2),
  }
})