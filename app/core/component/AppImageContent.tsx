import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

type AppTextContentProps = {
  uri: string
}

const dummy_image = 'https://via.placeholder.com/400x400.png/0077ff?text=animals+veritatis';

export default function AppImageContent({uri}: AppTextContentProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri:uri != ''? uri : dummy_image }} style={styles.contentImage} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: wp(2),
  },
  contentImage: {
    width: wp(80),
    height: wp(50),
    borderRadius: wp(1.5)
  },
})