import React from 'react';
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import AppText from './AppText';
import { StyleSheet } from 'react-native';

type AppButtonProps = {
  children?: React.ReactNode,
  onPress?: () => void,
  style?: StyleProp<ViewStyle>,
  textStyle?: StyleProp<TextStyle>,
}

export default function AppButton({children, onPress, style, textStyle}: AppButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <AppText bold style={[styles.text, textStyle]}>
        {children}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: 40,
    backgroundColor: '#29B6F6',
    borderRadius: 25,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    textAlign: 'center',
    lineHeight: 40,
    color: 'white',
  }
})