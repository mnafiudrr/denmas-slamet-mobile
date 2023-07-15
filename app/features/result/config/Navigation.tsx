import {TypedNavigator} from '@react-navigation/native';
import React from 'react';
import Screens from './Screens';
import Result from '../screens/Result';

function getNavigation(Root: TypedNavigator<any, any, any, any, any>) {
  return [
    <Root.Screen
      name={Screens.RESULT.KEY}
      component={Result}
      key={Screens.RESULT.KEY}
      options={{
        title: Screens.RESULT.TITLE,
        headerShown: false,
      }}
    />,
  ];
}

const ResultNavigation = {
  getNavigation,
};

export default ResultNavigation;
