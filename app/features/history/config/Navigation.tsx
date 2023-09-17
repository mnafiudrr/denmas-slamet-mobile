import {TypedNavigator} from '@react-navigation/native';
import React from 'react';
import Screens from './Screens';
import History from '../screens/History';
import ListUser from '../screens/ListUser';
import ListData from '../screens/ListData';

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
    <Root.Screen
      name={Screens.LIST_USER.KEY}
      component={ListUser}
      key={Screens.LIST_USER.KEY}
      options={{
        title: Screens.LIST_USER.TITLE,
        headerShown: false,
      }}
    />,
    <Root.Screen
      name={Screens.LIST_DATA.KEY}
      component={ListData}
      key={Screens.LIST_DATA.KEY}
      options={{
        title: Screens.LIST_DATA.TITLE,
        headerShown: false,
      }}
    />,
  ];
}

const HistoryNavigation = {
  getNavigation,
};

export default HistoryNavigation;
