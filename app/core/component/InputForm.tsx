import React, { useImperativeHandle, useRef } from 'react';
import {View, StyleSheet, StyleProp, TextStyle, ViewStyle} from 'react-native';
import AppColors from '../static/AppColors';
import { TextInput } from 'react-native';

type InputFormProps = {
  value?: string,
  placeholder?: string,
  onChangeText?: (value: string) => void,
  style?: StyleProp<ViewStyle>,
  onSubmitEditing?: () => void,
  secureTextEntry?: boolean,
  returnKeyType?: 'next' | 'done' | 'search' | 'go' | 'send' | 'default' | 'emergency-call' | 'google' | 'join' | 'route' | 'yahoo' | undefined,
  ref?: any,
}

const InputForm = React.forwardRef<inputHandle, InputFormProps>(({
  value, placeholder, style, onChangeText, onSubmitEditing, returnKeyType, secureTextEntry
}, ref) => {

  const textInputRef = useRef<TextInput>(null);

  useImperativeHandle(ref, () => ({
    onFocus: () => textInputRef.current?.focus(),
  }));

  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputContainer}>
        <TextInput 
          ref={textInputRef}
          secureTextEntry={secureTextEntry}
          returnKeyType={returnKeyType}
          placeholder={placeholder} 
          value={value} 
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChangeText}/>
      </View>
    </View>
  );
});

export default InputForm;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    backgroundColor: '#9FDEFB',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  inputContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
});

export type inputHandle = {
  onFocus: () => void;
};