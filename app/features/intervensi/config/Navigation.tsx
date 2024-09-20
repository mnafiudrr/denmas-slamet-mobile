import { TypedNavigator } from "@react-navigation/native";
import React from "react";
import Screens from "./Screens";
import DaftarIntervensi from "../screens/DaftarIntervensi";
import DetailIntervensi from "../screens/DetailIntervensi";

function getNavigation(Root: TypedNavigator<any, any, any, any, any>) {
  return [
    <Root.Screen
      name={Screens.DAFTAR_INTERVENSI.KEY}
      component={DaftarIntervensi}
      key={Screens.DAFTAR_INTERVENSI.KEY}
      options={{
        title: Screens.DAFTAR_INTERVENSI.TITLE,
        headerShown: false,
      }}
    />,
    <Root.Screen
      name={Screens.DETAIL_INTERVENSI.KEY}
      component={DetailIntervensi}
      key={Screens.DETAIL_INTERVENSI.KEY}
      options={{
        title: Screens.DETAIL_INTERVENSI.TITLE,
        headerShown: false,
      }}
    />,
  ];
}

const IntervensiNavigation = {
  getNavigation,
};

export default IntervensiNavigation;
