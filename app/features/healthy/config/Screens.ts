import ScreenData from '~/app/core/class/ScreenData';

const HealthyScreen = {
  FORM_PREGNANCY: new ScreenData<any>({
    KEY: 'Healthy/FormPregnancy',
    TITLE: 'FormPregnancy',
  }),
  FORM_HEALTHY: new ScreenData<any>({
    KEY: 'Healthy/FormHealthy',
    TITLE: 'FormHealthy',
  }),
  STATUS_GIZI: new ScreenData<any>({
    KEY: 'Healthy/StatusGizi',
    TITLE: 'StatusGizi',
  }),
  FORM_PMT: new ScreenData<any>({
    KEY: 'Healthy/FormPMT',
    TITLE: 'FormPMT',
  }),
};

export default HealthyScreen;
