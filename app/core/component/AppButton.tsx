import React from 'react';
import { TouchableOpacity } from 'react-native';
import AppText from './AppText';
import { StyleSheet } from 'react-native';

type AppButtonProps = {
  children?: React.ReactNode,
  onPress?: () => void,
  style?: any,
}

export default function AppButton({children, onPress, style}: AppButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <AppText bold style={styles.text}>
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