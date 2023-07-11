import ScreenData from '~/app/core/class/ScreenData';

const AuthScreen = {
  LOGIN: new ScreenData<any>({
    KEY: 'Auth/Login',
    TITLE: 'Login',
  }),
  SIGNUP: new ScreenData<any>({
    KEY: 'Auth/Signup',
    TITLE: 'Signup',
  }),
};

export default AuthScreen;
