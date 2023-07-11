import {TypedNavigator} from '@react-navigation/native';
import React from 'react';
import Splash from '../screens/Splash';
import Screens from './Screens';

function getNavigation(Root: TypedNavigator<any, any, any, any, any>) {
  return [
    <Root.Screen
      name={Screens.SPLASH.KEY}
      component={Splash}
      key={Screens.SPLASH.KEY}
      options={{
        title: Screens.SPLASH.TITLE,
        headerShown: false,
      }}
    />,
  ];
}

const SplashNavigation = {
  getNavigation,
};

export default SplashNavigation;
