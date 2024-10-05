import React, {useMemo} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import AppColors from '../static/AppColors';

type AppTextProps = TextProps & {
  children?: React.ReactNode
  font?: string,
  semiBold?: boolean,
  bold?: boolean,
  white?: boolean,
  color?: string,
};

export default function AppText({
  style,
  font = 'poppins',
  semiBold = false,
  bold = false,
  children = '',
  white = false,
  color = '',
  ...props
}: AppTextProps) {
  const flatStyle = useMemo(() => {
    const {fontWeight, ...values} = StyleSheet.flatten(style ?? {});
    return {fontWeight, values};
  }, [style]);

  const family = useMemo(() => {
    const styleBold = flatStyle.fontWeight === 'bold';
    return `${font}${(bold || styleBold) ? '_bold' : ''}${semiBold ? '_semibold' : ''}`;
  }, [flatStyle.fontWeight, font, bold, semiBold]);

  return (
    <Text
      style={[{fontFamily: family, color: white ? AppColors.white : color != '' ? color : AppColors.black},
      flatStyle.values]}
      {...props}
    >
      {children}
    </Text>
  );
}
