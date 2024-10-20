/* eslint-disable no-nested-ternary */
import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashNavigation from '~/app/features/splash/config/Navigation';
import HomeNavigation from '~/app/features/home/config/Navigation';
import { SplashContext } from './SplashContext';
import AuthNavigation from '~/app/features/auth/config/Navigation';
import { AuthContext } from './AuthContext';
import HealthyNavigation from '~/app/features/healthy/config/Navigation';
import ResultNavigation from '~/app/features/result/config/Navigation';
import HistoryNavigation from '~/app/features/history/config/Navigation';
import ProfileNavigation from '~/app/features/profile/config/Navigation';
import PrinsipNavigation from '~/app/features/prinsip/config/Navigation';
import FaqNavigation from '~/app/features/faq/config/Navigation';
import IntervensiNavigation from '~/app/features/intervensi/config/Navigation';

const Root = createStackNavigator();

function listScreen() {
  return [
    ...HomeNavigation.getNavigation(Root),
    ...HealthyNavigation.getNavigation(Root),
    ...ResultNavigation.getNavigation(Root),
    ...HistoryNavigation.getNavigation(Root),
    ...ProfileNavigation.getNavigation(Root),
    ...PrinsipNavigation.getNavigation(Root),
    ...FaqNavigation.getNavigation(Root),
    ...IntervensiNavigation.getNavigation(Root),
  ];
}

function authScreen() {
  return [
    ...AuthNavigation.getNavigation(Root),
  ];
}

function splashScreen() {
  return [
    ...SplashNavigation.getNavigation(Root),
  ]
}

function RootNavigation() {

  const [splashLoading, setSplashLoading] = useState(true);
  const [userData, setUserData] = useState({
    id: '',
    phone: '',
    username: '',
    token: '',
    name: '',
    is_admin: false,
    profile_id: '',
    fullname: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SplashContext.Provider 
    value={{ splashLoading, setSplashLoading }}>
      <AuthContext.Provider
        value={{ userData, setUserData, isLoggedIn, setIsLoggedIn }}>
        <Root.Navigator>
          {
            splashLoading ?
              splashScreen()
                :
              isLoggedIn ?
                listScreen()
                  :
                authScreen()
          }
        </Root.Navigator>
      </AuthContext.Provider>
    </SplashContext.Provider>
  );
}

export default RootNavigation;
