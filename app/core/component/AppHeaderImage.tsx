import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Visible from './Visible'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

type AppTextContentProps = {
  uri?: string,
}

export default function AppHeaderImage({uri}: AppTextContentProps) {
  return (
    <View>
      <Visible visible={!!uri}>
        <Image source={{ uri }} style={styles.header} />
      </Visible>
      <Visible visible={!uri}>
        <View style={[styles.header, {backgroundColor:'grey'}]}/>
      </Visible>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: wp(100),
    height: wp(20),
  },
})