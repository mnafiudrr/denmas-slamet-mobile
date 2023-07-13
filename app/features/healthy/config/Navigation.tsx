import {TypedNavigator} from '@react-navigation/native';
import React from 'react';
import Screens from './Screens';
import FormPregnancy from '../screens/FormPregnancy';

function getNavigation(Root: TypedNavigator<any, any, any, any, any>) {
  return [
    <Root.Screen
      name={Screens.FORM_PREGNANCY.KEY}
      component={FormPregnancy}
      key={Screens.FORM_PREGNANCY.KEY}
      options={{
        title: Screens.FORM_PREGNANCY.TITLE,
        headerShown: false,
      }}
    />,
  ];
}

const HealthyNavigation = {
  getNavigation,
};

export default HealthyNavigation;
