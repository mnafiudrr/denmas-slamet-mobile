import { CompositeNavigationProp } from '@react-navigation/native';
import React, { useContext, useRef, useState } from 'react';
import { Alert, Dimensions, Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import AppButton from '~/app/core/component/AppButton';
import AppText from '~/app/core/component/AppText';
import AppView from '~/app/core/component/AppView';
import InputForm, { inputHandle } from '~/app/core/component/InputForm';
import { formatDate, numberOnly } from '~/app/core/utils/formatter';
import ResultScreen from '../../result/config/Screens';
import axios from 'axios';
import { AuthContext } from '~/app/core/config/AuthContext';
import { showLoading } from '~/app/core/utils/loader';
import { REPORT_PATH } from '~/app/service/ApiServices';

type Props = {
  route: any,
}

export default function FormHealthy({ navigation, route }: { navigation: CompositeNavigationProp<any, any> } & Props) {

  const { pregnancy } = route.params;
  const { userData } = useContext(AuthContext);
  const refTinggiBadan = useRef<inputHandle>(null);
  const refBeratBadan = useRef<inputHandle>(null);
  const refTekananDarahSistol = useRef<inputHandle>(null);
  const refTekananDarahDiastol = useRef<inputHandle>(null);
  const refKadarGula = useRef<inputHandle>(null);
  const refKadarHb = useRef<inputHandle>(null);
  const refKadarKolesterol = useRef<inputHandle>(null);
  const refKadarAsamUrat = useRef<inputHandle>(null);

  type dataTypes = {
    tinggi_badan?: string;
    berat_badan?: string;
    tekanan_darah_sistol?: string;
    tekanan_darah_diastol?: string;
    kadar_gula?: string;
    kadar_hb?: string;
    kadar_kolesterol?: string;
    kadar_asam_urat?: string;
  }

  const [data, setData] = useState<dataTypes>({});

  const validate = (): boolean => {
    const requiredFields = [
      data.tinggi_badan,
      data.berat_badan,
      data.tekanan_darah_sistol,
      data.tekanan_darah_diastol,
      data.kadar_gula,
      data.kadar_hb,
      data.kadar_kolesterol,
      data.kadar_asam_urat,
    ];
    if (requiredFields.some(field => field === undefined || field === '')) return false;
    return true;
  };

  const toggleNextButton = async () => {
    // ResultScreen.RESULT.navigate(navigation)
    const isValid = validate();
    if (!isValid) return Alert.alert('Peringatan', 'Mohon lengkapi data terlebih dahulu');

    const request_data = {
      ...pregnancy,
      ...data,
    }

    showLoading(true);
    try {
      const promise = await axios({
        method: 'post',
        url: REPORT_PATH,
        timeout: 15000,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`,
        },
        data: request_data,
      });

      const response = promise.data.data;

      const result_res = response.result;
      const health_res = response.health;

      const result = {
        id: response.id,
        name: response.profile.fullname,
        date: formatDate(response.created_at),
        imt: `${result_res.imt} (${result_res.status_imt})`,
        tekanan_darah: `${health_res.tekanan_darah_sistol}/${health_res.tekanan_darah_diastol} (${result_res.status_tekanan_darah})`,
        gula_darah: `${health_res.kadar_gula} (${result_res.status_gula})`,
        hb: `${health_res.kadar_hb} (${result_res.status_hb})`,
        kolesterol: `${health_res.kadar_kolesterol} (${result_res.status_kolesterol})`,
        asam_urat: `${health_res.kadar_asam_urat} (${result_res.status_asam_urat})`,
        statuses: result_res.status,
      }

      ResultScreen.RESULT.navigate(navigation, { data: result });
        
    } catch (error) {
      console.log('error', error);
    }
    showLoading(false);
  }

  return (
    <AppView withSafeArea withHeader title='Back' imageBg={require('~/assets/images/bg-info-kesehatan.png')}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.formBox}>
            <AppText style={styles.title} bold>Informasi Kesehatan</AppText>
            <View style={styles.warpForm}>
              <AppText style={styles.label}>Tinggi Badan (cm)</AppText>
              <InputForm
                onSubmitEditing={() => refBeratBadan.current?.onFocus()}
                returnKeyType="next"
                style={styles.form}
                placeholder='Tinggi Badan'
                keyboardType='numeric'
                value={data.tinggi_badan}
                onChangeText={(text: string) => setData({ ...data, tinggi_badan: numberOnly(text) })}
              />
              <AppText style={styles.label}>Berat Badan (kg)</AppText>
              <InputForm
                ref={refBeratBadan}
                onSubmitEditing={() => refTekananDarahSistol.current?.onFocus()}
                returnKeyType="next"
                style={styles.form}
                placeholder='Berat Badan'
                keyboardType='numeric'
                value={data.berat_badan}
                onChangeText={(text: string) => setData({ ...data, berat_badan: numberOnly(text) })}
              />
              <AppText style={styles.label}>Tekanan Darah (mmHg)</AppText>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <InputForm
                  ref={refTekananDarahSistol}
                  onSubmitEditing={() => refTekananDarahDiastol.current?.onFocus()}
                  returnKeyType="next"
                  style={[styles.form, { width: '47%'}]}
                  placeholder='Sistol'
                  keyboardType='numeric'
                  value={data.tekanan_darah_sistol}
                  onChangeText={(text: string) => setData({ ...data, tekanan_darah_sistol: numberOnly(text) })}
                />
                <AppText style={{ alignSelf: 'center', fontSize: 40, marginTop: -15 }}>/</AppText>
                <InputForm
                  ref={refTekananDarahDiastol}
                  onSubmitEditing={() => refKadarGula.current?.onFocus()}
                  returnKeyType="next"
                  style={[styles.form, { width: '47%'}]}
                  placeholder='Diastol'
                  keyboardType='numeric'
                  value={data.tekanan_darah_diastol}
                  onChangeText={(text: string) => setData({ ...data, tekanan_darah_diastol: numberOnly(text) })}
                />
              </View>
              <AppText style={styles.label}>Kadar Gula Darah (mg/dL)</AppText>
              <InputForm
                ref={refKadarGula}
                onSubmitEditing={() => refKadarHb.current?.onFocus()}
                returnKeyType="next"
                style={styles.form}
                placeholder='Gula Darah'
                keyboardType='numeric'
                value={data.kadar_gula}
                onChangeText={(text: string) => setData({ ...data, kadar_gula: numberOnly(text) })}
              />
              <AppText style={styles.label}>Kadar HB (g/dL)</AppText>
              <InputForm
                ref={refKadarHb}
                onSubmitEditing={() => refKadarKolesterol.current?.onFocus()}
                returnKeyType="next"
                style={styles.form}
                placeholder='HB'
                keyboardType='numeric'
                value={data.kadar_hb}
                onChangeText={(text: string) => setData({ ...data, kadar_hb: numberOnly(text) })}
              />
              <AppText style={styles.label}>Kadar Kolesterol (mg/dL)</AppText>
              <InputForm
                ref={refKadarKolesterol}
                onSubmitEditing={() => refKadarAsamUrat.current?.onFocus()}
                returnKeyType="next"
                style={styles.form}
                placeholder='Kolesterol'
                keyboardType='numeric'
                value={data.kadar_kolesterol}
                onChangeText={(text: string) => setData({ ...data, kadar_kolesterol: numberOnly(text) })}
              />
              <AppText style={styles.label}>Kadar Asam Urat</AppText>
              <InputForm
                ref={refKadarAsamUrat}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                  toggleNextButton();
                }}
                style={styles.form}
                placeholder='Asam Urat'
                keyboardType='numeric'
                value={data.kadar_asam_urat}
                onChangeText={(text: string) => setData({ ...data, kadar_asam_urat: numberOnly(text, 1) })}
              />
            </View>
            <AppButton style={styles.button} onPress={toggleNextButton}>
              Lanjut
            </AppButton>
          </View>
        </View>
      </ScrollView>
    </AppView>
  )
}

const heightScreen = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formBox: {
    width: '100%',
    padding: 20,
    paddingTop: 0,
    flex: 1,
    overflow: 'hidden',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: '15%',
  },
  warpForm: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
  },
  form: {
    marginBottom: 10,
  },
  checkbox: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    elevation: 5,
  },
  footer: {
    bottom: 0,
  },
  logo: {
    width: '100%',
  },
});