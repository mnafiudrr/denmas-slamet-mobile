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
};

export default HealthyScreen;
