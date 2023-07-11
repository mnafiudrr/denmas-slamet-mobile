import {TypedNavigator} from '@react-navigation/native';
import React from 'react';
import History from '../screens/History';
import Result from '../screens/Result';
import Scanner from '../screens/Scanner';
import Screens from './Screens';

function getNavigation(Root: TypedNavigator<any, any, any, any, any>) {
  return [
    <Root.Screen
      name={Screens.SCANNER.KEY}
      component={Scanner}
      key={Screens.SCANNER.KEY}
      options={{
        title: Screens.SCANNER.TITLE,
        headerShown: false,
      }}
    />,
    <Root.Screen
      name={Screens.RESULT.KEY}
      component={Result}
      key={Screens.RESULT.KEY}
      options={{
        title: Screens.RESULT.TITLE,
        headerShown: false,
      }}
    />,
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

const ScannerNavigation = {
  getNavigation,
};

export default ScannerNavigation;
