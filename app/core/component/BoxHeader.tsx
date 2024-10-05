import React from "react";
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import AppText from "./AppText";
import { StyleSheet } from "react-native";
import AppButton from "./AppButton";

type BoxHeaderProps = {
  children?: React.ReactNode;
  onPress?: () => void;
};

export default function BoxHeader({
  children,
  onPress,
}: BoxHeaderProps) {
  return (
    <AppButton
      style={styles.button}
      onPress={onPress}
    >
      Prinsip 3J
    </AppButton>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "60%",
    maxWidth: 250,
    elevation: 10,
    marginBottom: 20,
  },
});
