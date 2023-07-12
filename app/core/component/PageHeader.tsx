/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Pressable, TextStyle, View, ViewStyle } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
import AppText from './AppText';
import AppColors from '../static/AppColors';
import ToggleableSafeArea from './ToggleSafeArea';

export default function PageHeader({
  title, style, textStyle, iconColor, withSafeArea, suffix, backButton,
}: {
  title?: string, style?:
  ViewStyle, textStyle?: TextStyle, iconColor?: string,
  withSafeArea?: boolean, suffix?: any, backButton?: any
}) {
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
  return (
    <ToggleableSafeArea edges={['top']} active={!withSafeArea} style={style}>
      <View style={{
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: AppColors.blue,
        paddingVertical: 10,
        ...style ?? {},
      }}
      >
        <Pressable onPress={backButton || navigation.goBack}>
          {/* <AntDesign onPress={backButton || navigation.goBack} name="arrowleft" color={iconColor} size={10} style={{ marginTop: 10 }} /> */}
          <AppText
            semiBold
            style={{
              marginLeft: 10, ...textStyle,
            }}
          >
            {title??'Back'}
          </AppText>
        </Pressable>
      </View>
      {suffix}
    </ToggleableSafeArea>
  );
}

PageHeader.defaultProps = {
  title: '',
  style: {},
  textStyle: {},
  iconColor: AppColors.black,
  withSafeArea: false,
  suffix: null,
};