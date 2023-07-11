import React from 'react';
import {ViewStyle, StatusBar, ImageBackground, ImageSourcePropType} from 'react-native';
import ToggleableSafeArea from './ToggleSafeArea';

export default function AppView({
  children, withHeader, title, style, styleHeader,
  styleBg,
  withSafeArea,
  suffixHeader,
  backButton,
  imageBg,
}: {children: React.ReactNode, withHeader?: boolean,
  withSafeArea?: boolean,
  title?: string, style?: ViewStyle,
  styleBg?: ViewStyle,
  imageBg?: ImageSourcePropType | null,
  styleHeader?: ViewStyle, suffixHeader?: React.ReactNode, backButton?:any | null}) {

  if (!imageBg)
    return (
      <ToggleableSafeArea active={withSafeArea ?? false} style={{flex: 1, ...style}}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        {children}
      </ToggleableSafeArea>
    );
  return (
    <ImageBackground source={imageBg} style={{flex: 1, ...styleBg}}>
      <ToggleableSafeArea active={withSafeArea ?? false} style={{flex: 1, ...style}}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
          {children}
      </ToggleableSafeArea>
    </ImageBackground>
  );
}

AppView.defaultProps = {
  withHeader: true,
  title: '',
  style: {},
  styleHeader: {},
  suffixHeader: null,
  withSafeArea: false,
  imageBg: null,
  styleBg: {},
};
