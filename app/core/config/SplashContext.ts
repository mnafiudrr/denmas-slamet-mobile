import {createContext} from 'react';

const SplashCtxDefaultValue = {
  splashLoading: true,
  setSplashLoading: (boolean: boolean) => {},
}

export const SplashContext = createContext(SplashCtxDefaultValue);