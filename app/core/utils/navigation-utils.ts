import AsyncStorage from '@react-native-async-storage/async-storage';
import {CompositeNavigationProp, NavigationState, useFocusEffect} from '@react-navigation/native';
import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {LogBox} from 'react-native';
import storage from './storage';

/**
 * Custom hook for persisting navigation state.
 */
// eslint-disable-next-line import/prefer-default-export
export function useNavigationPersistence(persistenceKey: string) {
  const [initialNavigationState, setInitialNavigationState] = useState();
  const [isRestoringNavigationState, setIsRestoringNavigationState] = useState(true);

  const timerId = useRef(false);

  const onNavigationStateChange = (state: NavigationState | undefined) => {
    // Persist state to storage
    storage.save(persistenceKey, state);
  };

  const restoreState = useCallback(async () => {
    try {
      const state = await storage.load(persistenceKey);
      if (state) setInitialNavigationState(state);
    } finally {
      setIsRestoringNavigationState(false);
    }
  }, [persistenceKey]);

  useEffect(() => {
    if (isRestoringNavigationState) restoreState();
  }, [isRestoringNavigationState, restoreState]);

  return {onNavigationStateChange, restoreState, initialNavigationState};
}

export function useMustLogin(
  navigation: CompositeNavigationProp<any, any>,
  loggedIn: boolean,
) {
  const [focus, setFocus] = useState(true);

  useEffect(() => {
    if (focus) {
      //   if (loggedIn !== true) navigation.navigate(HomeScreens.HOME.KEY);
    }
  }, [loggedIn, focus, navigation]);

  useFocusEffect(
    useCallback(() => {
      setFocus(true);
      return () => {
        setFocus(false);
      };
    }, []),
  );

  return {loggedIn};
}
