import React from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import AppText from './AppText';
import Checkbox from 'expo-checkbox';

type AppYesNoProps = {
  value?: boolean,
  onValueChange?: (value: boolean) => void,
  style?: StyleProp<ViewStyle>,
  customLabel?: {
    yes?: string,
    no?: string,
  }
}

export default function AppYesNo({value, onValueChange, style, customLabel}: AppYesNoProps) {

  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.inputContainer}>
        <Checkbox
                style={styles.checkbox}
                value={value}
                onValueChange={onValueChange}
                color={value ? '#29B6F6' : undefined}
              />
        <AppText style={styles.label}>
          {customLabel?.yes || 'Ya'}
        </AppText>
      </Pressable>
      <Pressable style={styles.inputContainer}>
        <Checkbox
                style={styles.checkbox}
                value={value === false}
                onValueChange={(value) => onValueChange && onValueChange(!value)}
                color={value === false ? '#29B6F6' : undefined}
              />
        <AppText style={styles.label}>
          {customLabel?.no || 'Tidak'}
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
  }
});