import ScreenData from '~/app/core/class/ScreenData';

const ScannerScreens = {
  SCANNER: new ScreenData<any>({
    KEY: 'Scanner',
    TITLE: 'Scanner',
  }),
  RESULT: new ScreenData<any>({
    KEY: 'Result',
    TITLE: 'Result',
  }),
  HISTORY: new ScreenData<any>({
    KEY: 'History',
    TITLE: 'History',
  }),
};

export default ScannerScreens;
