import { TypedNavigator } from "@react-navigation/native";
import React from "react";
import Screens from "./Screens";
import Faq from "../screens/Faq";

function getNavigation(Root: TypedNavigator<any, any, any, any, any>) {
  return [
    <Root.Screen
      name={Screens.FAQ.KEY}
      component={Faq}
      key={Screens.FAQ.KEY}
      options={{
        title: Screens.FAQ.TITLE,
        headerShown: false,
      }}
    />,
  ];
}

const FaqNavigation = {
  getNavigation,
};

export default FaqNavigation;
