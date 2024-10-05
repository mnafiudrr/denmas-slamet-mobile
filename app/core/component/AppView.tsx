import React from 'react';
import {ViewStyle, StatusBar, ImageBackground, ImageSourcePropType} from 'react-native';
import ToggleableSafeArea from './ToggleSafeArea';
import PageHeader from './PageHeader';

export default function AppView({
  children,
  withHeader = false,
  title = "",
  style = {},
  styleHeader = {},
  styleBg = {},
  withSafeArea = false,
  suffixHeader = null,
  backButton,
  imageBg = require("~/assets/images/bg-main.png"),
}: {
  children: React.ReactNode;
  withHeader?: boolean;
  withSafeArea?: boolean;
  title?: string;
  style?: ViewStyle;
  styleBg?: ViewStyle;
  imageBg?: ImageSourcePropType | null;
  styleHeader?: ViewStyle;
  suffixHeader?: React.ReactNode;
  backButton?: any | null;
}) {
  if (!imageBg)
    return (
      <ToggleableSafeArea
        active={withSafeArea ?? false}
        style={{ flex: 1, ...style }}
      >
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />
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
    <ImageBackground source={imageBg} style={{ flex: 1, ...styleBg }}>
      <ToggleableSafeArea
        active={withSafeArea ?? false}
        style={{ flex: 1, ...style }}
      >
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />
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
