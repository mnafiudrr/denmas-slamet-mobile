import {createContext} from 'react';

const AuthCtxDefaultValue = {
  userData: {
    id: '',
    phone: '',
    username: '',
    token: '',
  },
  setUserData: (userData: {
    id: string,
    phone: string,
    username: string,
    token: string,
  }) => {},
  isLoggedIn: false,
  setIsLoggedIn: (boolean: boolean) => {},
}

export const AuthContext = createContext(AuthCtxDefaultValue);