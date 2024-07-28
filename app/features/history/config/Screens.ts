import ScreenData from '~/app/core/class/ScreenData';

const HistoryScreen = {
  HISTORY: new ScreenData<any>({
    KEY: 'History/History',
    TITLE: 'History',
  }),
  LIST_USER: new ScreenData<any>({
    KEY: 'History/ListUser',
    TITLE: 'List User',
  }),
  LIST_DATA: new ScreenData<any>({
    KEY: 'History/ListData',
    TITLE: 'List Data',
  }),
};

export default HistoryScreen;
