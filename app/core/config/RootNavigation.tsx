/* eslint-disable no-nested-ternary */
import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashNavigation from '~/app/features/splash/config/Navigation';
import HomeNavigation from '~/app/features/home/config/Navigation';
import ScannerNavigation from '~/app/features/scanner/config/Navigation';
import { SplashContext } from './SplashContext';
import AuthNavigation from '~/app/features/auth/config/Navigation';
import { AuthContext } from './AuthContext';

const Root = createStackNavigator();

function listScreen() {
  return [
    ...HomeNavigation.getNavigation(Root),
    ...ScannerNavigation.getNavigation(Root),
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
