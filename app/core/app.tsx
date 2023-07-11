/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable global-require */
import {NavigationContainer} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import React, {useState} from 'react';
import RootNavigation from './config/RootNavigation';
import { useNavigationPersistence } from './utils/navigation-utils';
import {AppLoading} from './component/AppLoading';
import {useRefLoading} from './utils/loader';
import { StatusBar } from 'expo-status-bar';

const NAVIGATION_PERSISTENCE_KEY = '@root_nav_state';

export default function App() {
  const {initialNavigationState, onNavigationStateChange} = useNavigationPersistence(
    NAVIGATION_PERSISTENCE_KEY,
  );

  return (
      <NavigationContainer
        initialState={initialNavigationState}
        onStateChange={onNavigationStateChange}
      >
        <RootNavigation />
        <AppLoading ref={(as) => useRefLoading(as)} />
        <StatusBar style='dark' />
      </NavigationContainer>
  );
}
