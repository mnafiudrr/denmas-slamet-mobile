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
};

export default HistoryScreen;
