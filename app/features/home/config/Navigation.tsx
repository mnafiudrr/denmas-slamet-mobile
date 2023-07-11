import {TypedNavigator} from '@react-navigation/native';
import React from 'react';
import Home from '../screens/Home';
import Screens from './Screens';

function getNavigation(Root: TypedNavigator<any, any, any, any, any>) {
  return [
    <Root.Screen
      name={Screens.HOME.KEY}
      component={Home}
      key={Screens.HOME.KEY}
      options={{
        title: Screens.HOME.TITLE,
        headerShown: false,
      }}
    />,
  ];
}

const HomeNavigation = {
  getNavigation,
};

export default HomeNavigation;
