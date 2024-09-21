import { TypedNavigator } from "@react-navigation/native";
import React from "react";
import Screens from "./Screens";
import Prinsip from "../screens/Prinsip";

function getNavigation(Root: TypedNavigator<any, any, any, any, any>) {
  return [
    <Root.Screen
      name={Screens.PRINSIP.KEY}
      component={Prinsip}
      key={Screens.PRINSIP.KEY}
      options={{
        title: Screens.PRINSIP.TITLE,
        headerShown: false,
      }}
    />,
  ];
}

const PrinsipNavigation = {
  getNavigation,
};

export default PrinsipNavigation;
