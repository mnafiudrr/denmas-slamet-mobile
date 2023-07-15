import {TypedNavigator} from '@react-navigation/native';
import React from 'react';
import Screens from './Screens';
import History from '../screens/History';

function getNavigation(Root: TypedNavigator<any, any, any, any, any>) {
  return [
    <Root.Screen
      name={Screens.HISTORY.KEY}
      component={History}
      key={Screens.HISTORY.KEY}
      options={{
        title: Screens.HISTORY.TITLE,
        headerShown: false,
      }}
    />,
  ];
}

const HistoryNavigation = {
  getNavigation,
};

export default HistoryNavigation;
