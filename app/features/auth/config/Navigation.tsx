import {TypedNavigator} from '@react-navigation/native';
import React from 'react';
import Login from '../screens/Login';
import Screens from './Screens';
import SignUp from '../screens/SignUp';

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
    <Root.Screen
      name={Screens.SIGNUP.KEY}
      component={SignUp}
      key={Screens.SIGNUP.KEY}
      options={{
        title: Screens.SIGNUP.TITLE,
        headerShown: false,
      }}
    />,
  ];
}

const AuthNavigation = {
  getNavigation,
};

export default AuthNavigation;
