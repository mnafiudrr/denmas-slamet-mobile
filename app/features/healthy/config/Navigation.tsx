import {TypedNavigator} from '@react-navigation/native';
import React from 'react';
import Screens from './Screens';
import FormPregnancy from '../screens/FormPregnancy';
import FormHealthy from '../screens/FormHealthy';

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
    <Root.Screen
      name={Screens.FORM_HEALTHY.KEY}
      component={FormHealthy}
      key={Screens.FORM_HEALTHY.KEY}
      options={{
        title: Screens.FORM_HEALTHY.TITLE,
        headerShown: false,
      }}
    />,
  ];
}

const HealthyNavigation = {
  getNavigation,
};

export default HealthyNavigation;
