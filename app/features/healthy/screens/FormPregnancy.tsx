import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import AppButton from '~/app/core/component/AppButton';
import AppText from '~/app/core/component/AppText';
import AppView from '~/app/core/component/AppView';
import AppYesNo from '~/app/core/component/AppYesNo';
import InputForm from '~/app/core/component/InputForm';
import Visible from '~/app/core/component/Visible';
import { numberOnly } from '~/app/core/utils/formatter';
import HealthyScreen from '../config/Screens';

type Props = {
  route: any,
}

export default function FormPregnancy({ route }: Props) {

  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
  const { profile_id } = route.params;

  type dataTypes = {
    hamil: boolean | undefined,
    usia_kehamilan: string,
    muntah: boolean | undefined,
    janin_pasif: boolean | undefined,
    pendarahan: boolean | undefined,
    bengkak: boolean | undefined,
    sembelit: boolean | undefined,
    nyeri_bak: boolean | undefined,
  }

  const [data, setData] = useState<dataTypes>({
    hamil: undefined,
    usia_kehamilan: '',
    muntah: undefined,
    janin_pasif: undefined,
    pendarahan: undefined,
    bengkak: undefined,
    sembelit: undefined,
    nyeri_bak: undefined,
  });

  const validate = (): boolean => {
    if (data.hamil === undefined) return false;
    if (data.hamil) {
      const requiredFields = [
        data.usia_kehamilan,
        data.muntah,
        data.janin_pasif,
        data.pendarahan,
        data.bengkak,
        data.sembelit,
        data.nyeri_bak,
      ];
      if (requiredFields.some(field => field === undefined || field === '')) {
        return false;
      }
    }
    return true;
  };

  const toggleNextButton = (): void => {
    const isValid = validate();
    if (!isValid) 
      return Alert.alert('Peringatan', 'Mohon lengkapi data terlebih dahulu');
    return HealthyScreen.FORM_HEALTHY.navigate(navigation, { 
      pregnancy: {
        ...data, 
        profile_id, 
        usia_kehamilan: Number(data.usia_kehamilan)
      }
    });
  }

  return (
    <AppView withSafeArea withHeader title='Back' imageBg={require('~/assets/images/bg-kehamilan.png')}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.formBox}>
            <AppText style={styles.title} bold>Kehamilan</AppText>
            <AppText style={styles.label}>Apakah anda sedang hamil?</AppText>
            <AppYesNo value={data.hamil} onValueChange={(value) => setData({...data, hamil: value})} style={styles.checkbox}/>
            <Visible visible={!!data.hamil}>
              <>
                <AppText style={styles.label}>Berapa usia kehamilan anda?</AppText>
                <InputForm 
                  placeholder="Minggu ke-"
                  value={data.usia_kehamilan} 
                  keyboardType='number-pad'
                  onChangeText={(value) => setData({...data, usia_kehamilan: numberOnly(value)})} 
                  style={styles.form}/>
                <AppText style={styles.label}>{`Apakah anda mengalami mual? (>2x Sepekan)`}</AppText>
                <AppYesNo value={data.muntah} onValueChange={(value) => setData({...data, muntah: value})} style={styles.checkbox}/>
                <AppText style={styles.label}>{`Apakah anda tidak merasakan janin bergerak?`}</AppText>
                <AppYesNo value={data.janin_pasif} onValueChange={(value) => setData({...data, janin_pasif: value})} style={styles.checkbox}/>
                <AppText style={styles.label}>{`Apakah Anda pernah merasakan keluar bercak darah dari daerah vagina?`}</AppText>
                <AppYesNo value={data.pendarahan} onValueChange={(value) => setData({...data, pendarahan: value})} style={styles.checkbox}/>
                <AppText style={styles.label}>{`Apakah Anda merasakan kaki nyeri atau bengkak?`}</AppText>
                <AppYesNo value={data.bengkak} onValueChange={(value) => setData({...data, bengkak: value})} style={styles.checkbox}/>
                <AppText style={styles.label}>{`Apakah Anda merasakan sembelit?`}</AppText>
                <AppYesNo value={data.sembelit} onValueChange={(value) => setData({...data, sembelit: value})} style={styles.checkbox}/>
                <AppText style={styles.label}>{`Apakah Anda merasakan nyeri ketika buang air kecil?`}</AppText>
                <AppYesNo value={data.nyeri_bak} onValueChange={(value) => setData({...data, nyeri_bak: value})} style={styles.checkbox}/>
              </>
            </Visible>
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
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20,
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
    elevation: 10,
  },
  footer: {
    bottom: 0,
  },
  logo: {
    width: '100%',
  },
});