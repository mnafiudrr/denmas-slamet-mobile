import {TypedNavigator} from '@react-navigation/native';
import React from 'react';
import Login from '../screens/Login';
import Screens from './Screens';

function getNavigation(Root: TypedNavigator<any, any, any, any, any>) {
  return [
    <Root.Screen
      name={Screens.LOGIN.KEY}
      component={Login}
      key={Screens.LOGIN.KEY}
      options={{
        title: Screens.LOGIN.TITLE,
        headerShown: false,
      }}
    />,
  ];
}

const AuthNavigation = {
  getNavigation,
};

export default AuthNavigation;
