import {TypedNavigator} from '@react-navigation/native';
import React from 'react';
import Screens from './Screens';
import Profile from '../screens/Profile';

function getNavigation(Root: TypedNavigator<any, any, any, any, any>) {
  return [
    <Root.Screen
      name={Screens.PROFILE.KEY}
      component={Profile}
      key={Screens.PROFILE.KEY}
      options={{
        title: Screens.PROFILE.TITLE,
        headerShown: false,
      }}
    />,
  ];
}

const ProfileNavigation = {
  getNavigation,
};

export default ProfileNavigation;
