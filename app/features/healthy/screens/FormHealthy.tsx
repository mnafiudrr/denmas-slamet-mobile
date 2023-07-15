import { CompositeNavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import AppButton from '~/app/core/component/AppButton';
import AppText from '~/app/core/component/AppText';
import AppView from '~/app/core/component/AppView';
import InputForm from '~/app/core/component/InputForm';
import { numberOnly } from '~/app/core/utils/formatter';
import ResultScreen from '../../result/config/Screens';


export default function FormHealthy({ navigation }: { navigation: CompositeNavigationProp<any, any> }) {

  type dataTypes = {
    height?: string;
    weight?: string;
    bloodPressure?: string;
    bloodSugar?: string;
    hB?: string;
    colesterol?: string;
    gout?: string;
  }

  const [data, setData] = useState<dataTypes>({
  });

  const validate = (): boolean => {
    const requiredFields = [
      data.height,
      data.weight,
      data.bloodPressure,
      data.bloodSugar,
      data.hB,
      data.colesterol,
      data.gout,
    ];
    if (requiredFields.some(field => field === undefined || field === '')) return false;
    return true;
  };

  const toggleNextButton = (): void => {
    ResultScreen.RESULT.navigate(navigation)
    // const isValid = validate();
    // if (isValid) ResultScreen.RESULT.navigate(navigation);
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
                style={styles.form}
                placeholder='Tinggi Badan'
                keyboardType='numeric'
                value={data.height}
                onChangeText={(text: string) => setData({ ...data, height: numberOnly(text) })}
              />
              <AppText style={styles.label}>Berat Badan (kg)</AppText>
              <InputForm
                style={styles.form}
                placeholder='Berat Badan'
                keyboardType='numeric'
                value={data.weight}
                onChangeText={(text: string) => setData({ ...data, weight: numberOnly(text) })}
              />
              <AppText style={styles.label}>Tekanan Darah (mmHg)</AppText>
              <InputForm
                style={styles.form}
                placeholder='Tekanan Darah'
                keyboardType='numeric'
                value={data.bloodPressure}
                onChangeText={(text: string) => setData({ ...data, bloodPressure: numberOnly(text) })}
              />
              <AppText style={styles.label}>Kadar Gula Darah (mg/dL)</AppText>
              <InputForm
                style={styles.form}
                placeholder='Gula Darah'
                keyboardType='numeric'
                value={data.bloodSugar}
                onChangeText={(text: string) => setData({ ...data, bloodSugar: numberOnly(text) })}
              />
              <AppText style={styles.label}>Kadar HB (g/dL)</AppText>
              <InputForm
                style={styles.form}
                placeholder='HB'
                keyboardType='numeric'
                value={data.hB}
                onChangeText={(text: string) => setData({ ...data, hB: numberOnly(text) })}
              />
              <AppText style={styles.label}>Kadar Kolesterol (mg/dL)</AppText>
              <InputForm
                style={styles.form}
                placeholder='Kolesterol'
                keyboardType='numeric'
                value={data.colesterol}
                onChangeText={(text: string) => setData({ ...data, colesterol: numberOnly(text) })}
              />
              <AppText style={styles.label}>Kadar Asam Urat</AppText>
              <InputForm
                style={styles.form}
                placeholder='Asam Urat'
                keyboardType='numeric'
                value={data.gout}
                onChangeText={(text: string) => setData({ ...data, gout: numberOnly(text) })}
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