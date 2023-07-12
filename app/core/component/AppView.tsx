import React from 'react';
import {ViewStyle, StatusBar, ImageBackground, ImageSourcePropType} from 'react-native';
import ToggleableSafeArea from './ToggleSafeArea';
import PageHeader from './PageHeader';

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
        {withHeader ? (
          <PageHeader
            withSafeArea
            title={title}
            style={styleHeader}
            suffix={suffixHeader}
            backButton={backButton}
          />
        ) : null}
        {children}
      </ToggleableSafeArea>
    );
  return (
    <ImageBackground source={imageBg} style={{flex: 1, ...styleBg}}>
      <ToggleableSafeArea active={withSafeArea ?? false} style={{flex: 1, ...style}}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        {withHeader ? (
          <PageHeader
            withSafeArea
            title={title}
            style={styleHeader}
            suffix={suffixHeader}
            backButton={backButton}
          />
        ) : null}
          {children}
      </ToggleableSafeArea>
    </ImageBackground>
  );
}

AppView.defaultProps = {
  withHeader: false,
  title: '',
  style: {},
  styleHeader: {},
  suffixHeader: null,
  withSafeArea: false,
  imageBg: null,
  styleBg: {},
};
