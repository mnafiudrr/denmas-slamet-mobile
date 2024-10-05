import React from 'react';
import { ImageBackground, ImageSourcePropType, StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import AppText from './AppText';
import { StyleSheet } from 'react-native';

type AppButtonProps = {
  children?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  imageBg?: ImageSourcePropType | undefined;
};

export default function AppButton({children, onPress, style, textStyle, 
  imageBg = require("~/assets/images/bg-main.png")}: AppButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <ImageBackground source={imageBg} imageStyle={{ borderRadius: 25 }}>
        <AppText bold style={[styles.text, textStyle]}>
          {children}
        </AppText>
      </ImageBackground>
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