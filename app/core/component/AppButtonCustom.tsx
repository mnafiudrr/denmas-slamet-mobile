import React from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import AppText from "./AppText";
import { StyleSheet } from "react-native";

type AppButtonProps = {
  children?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  styleContent?: StyleProp<ViewStyle>;
  imageBg?: ImageSourcePropType | undefined;
};

export default function AppButtonCustom({
  children,
  onPress,
  style,
  styleContent,
  imageBg = require("~/assets/images/bg-main.png"),
}: AppButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <ImageBackground
        source={imageBg}
        imageStyle={{ borderRadius: 25 }}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={[{ flex: 1, padding: 10 }, styleContent]}>
          {children}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    backgroundColor: "#29B6F6",
    borderRadius: 25,
    justifyContent: "center",
    alignSelf: "center"
  },
});
