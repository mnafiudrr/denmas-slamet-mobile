import {CompositeNavigationProp} from '@react-navigation/native';

type ScreenDataProps<T> = {
  KEY: string,
  TITLE?: string,
  navigate?: (navigation: CompositeNavigationProp<any, any>, key: string, data?: T) => any,
};

export default class ScreenData<T> {
  KEY: string;

  TITLE?: string;

  navigate: (navigation: CompositeNavigationProp<any, any>, data?: T) => any;

  constructor({
    KEY, TITLE, navigate,
  }: ScreenDataProps<T>) {
    this.KEY = KEY;
    this.TITLE = TITLE;
    this.navigate = (navigation, data) => {
      if (navigate === undefined) navigation.navigate(KEY, data ?? {});
      else navigate(navigation, this.KEY, data);
    };
  }
}
