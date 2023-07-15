import { CompositeNavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import AppButton from '~/app/core/component/AppButton';
import AppText from '~/app/core/component/AppText';
import AppView from '~/app/core/component/AppView';
import AppYesNo from '~/app/core/component/AppYesNo';
import InputForm from '~/app/core/component/InputForm';
import Visible from '~/app/core/component/Visible';
import { numberOnly } from '~/app/core/utils/formatter';
import HealthyScreen from '../config/Screens';


export default function FormPregnancy({ navigation }: { navigation: CompositeNavigationProp<any, any> }) {

  type dataTypes = {
    isPregnant: boolean | undefined,
    gestationalAge: string,
    isVomitings: boolean | undefined,
    isMovingFetus: boolean | undefined,
    isBleeeding: boolean | undefined,
    isSwollen: boolean | undefined,
    isConstipation: boolean | undefined,
    isUrinating: boolean | undefined,
  }

  const [data, setData] = useState<dataTypes>({
    isPregnant: undefined,
    gestationalAge: '',
    isVomitings: undefined,
    isMovingFetus: undefined,
    isBleeeding: undefined,
    isSwollen: undefined,
    isConstipation: undefined,
    isUrinating: undefined,
  });

  const validate = (): boolean => {
    if (data.isPregnant === undefined) return false;
    if (data.isPregnant) {
      const requiredFields = [
        data.gestationalAge,
        data.isVomitings,
        data.isMovingFetus,
        data.isBleeeding,
        data.isSwollen,
        data.isConstipation,
        data.isUrinating,
      ];
      if (requiredFields.some(field => field === undefined || field === '')) {
        return false;
      }
    }
    return true;
  };

  const toggleNextButton = (): void => {
    const isValid = validate();
    if (isValid) HealthyScreen.FORM_HEALTHY.navigate(navigation);
  }

  return (
    <AppView withSafeArea withHeader title='Back' imageBg={require('~/assets/images/bg-kehamilan.png')}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.formBox}>
            <AppText style={styles.title} bold>Kehamilan</AppText>
            <AppText style={styles.label}>Apakah anda sedang hamil?</AppText>
            <AppYesNo value={data.isPregnant} onValueChange={(value) => setData({...data, isPregnant: value})} style={styles.checkbox}/>
            <Visible visible={!!data.isPregnant}>
              <>
                <AppText style={styles.label}>Berapa usia kehamilan anda?</AppText>
                <InputForm 
                  placeholder="Minggu ke-"
                  value={data.gestationalAge} 
                  keyboardType='number-pad'
                  onChangeText={(value) => setData({...data, gestationalAge: numberOnly(value)})} 
                  style={styles.form}/>
                <AppText style={styles.label}>{`Apakah anda mengalami mual? (>2x Sepekan)`}</AppText>
                <AppYesNo value={data.isVomitings} onValueChange={(value) => setData({...data, isVomitings: value})} style={styles.checkbox}/>
                <AppText style={styles.label}>{`Apakah anda tidak merasakan janin bergerak?`}</AppText>
                <AppYesNo value={data.isMovingFetus} onValueChange={(value) => setData({...data, isMovingFetus: value})} style={styles.checkbox}/>
                <AppText style={styles.label}>{`Apakah Anda pernah merasakan keluar bercak darah dari daerah vagina?`}</AppText>
                <AppYesNo value={data.isBleeeding} onValueChange={(value) => setData({...data, isBleeeding: value})} style={styles.checkbox}/>
                <AppText style={styles.label}>{`Apakah Anda merasakan kaki nyeri atau bengkak?`}</AppText>
                <AppYesNo value={data.isSwollen} onValueChange={(value) => setData({...data, isSwollen: value})} style={styles.checkbox}/>
                <AppText style={styles.label}>{`Apakah Anda merasakan sembelit?`}</AppText>
                <AppYesNo value={data.isConstipation} onValueChange={(value) => setData({...data, isConstipation: value})} style={styles.checkbox}/>
                <AppText style={styles.label}>{`Apakah Anda merasakan nyeri ketika buang air kecil?`}</AppText>
                <AppYesNo value={data.isUrinating} onValueChange={(value) => setData({...data, isUrinating: value})} style={styles.checkbox}/>
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