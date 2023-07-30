import {createContext} from 'react';

const AuthCtxDefaultValue = {
  userData: {
    id: '',
    phone: '',
    username: '',
    token: '',
    name: '',
    is_admin: false,
  },
  setUserData: (userData: {
    id: string,
    phone: string,
    username: string,
    token: string,
    name: string,
    is_admin: boolean,
  }) => {},
  isLoggedIn: false,
  setIsLoggedIn: (boolean: boolean) => {},
}

export const AuthContext = createContext(AuthCtxDefaultValue);