import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

type boxProps = {
  logo?: string,
  title?: string,
  onPress?: () => void,
};

export default function AppBox({logo, title, onPress}: boxProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.box}>
      <Image source={{ uri:logo }} style={styles.logo} />
      <Text>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(1.5),
    backgroundColor: 'grey',
  },
  box: {
    width: wp(17.1),
    margin: wp(1),
    alignItems: 'center',
  }
});