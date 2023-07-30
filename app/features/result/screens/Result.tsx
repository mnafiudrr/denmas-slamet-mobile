import { CompositeNavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { BackHandler, Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import AppButton from '~/app/core/component/AppButton';
import AppText from '~/app/core/component/AppText';
import AppView from '~/app/core/component/AppView';
import HomeScreen from '../../home/config/Screens';

type RouteProps = {
  route: any
}

export default function Result({ route }: RouteProps) {

  const { data } = route.params;
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        toggleNextButton();
        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [])
  );

  const toggleNextButton = (): void => {
    const previousScreen = navigation.getState().routes[navigation.getState().routes.length - 2].name;
    if (previousScreen === 'History/History') return navigation.goBack();
    return HomeScreen.HOME.navigate(navigation);
  }

  return (
    <AppView withSafeArea>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.formBox}>
            <AppText style={styles.title} bold>Hasil</AppText>
            <View style={styles.warpForm}>
              <AppText style={styles.label}>Nama</AppText>
              <AppText style={styles.value} bold>{data.name}</AppText>
              <AppText style={styles.label}>Tanggal</AppText>
              <AppText style={styles.value} bold>{data.date}</AppText>
              <AppText style={styles.label}>IMT</AppText>
              <AppText style={styles.value} bold>{data.imt}</AppText>
              <AppText style={styles.label}>Tekanan Darah</AppText>
              <AppText style={styles.value} bold>{data.tekanan_darah}</AppText>
              <AppText style={styles.label}>Gula Darah</AppText>
              <AppText style={styles.value} bold>{data.gula_darah}</AppText>
              <AppText style={styles.label}>HB</AppText>
              <AppText style={styles.value} bold>{data.hb}</AppText>
              <AppText style={styles.label}>Kolesterol</AppText>
              <AppText style={styles.value} bold>{data.kolesterol}</AppText>
              <AppText style={styles.label}>Asam Urat</AppText>
              <AppText style={styles.value} bold>{data.asam_urat}</AppText>
            </View>
            <AppButton style={styles.button} textStyle={styles.buttonText} onPress={toggleNextButton}>
              OK
            </AppButton>
          </View>
        </View>
      </ScrollView>
    </AppView>
  )
}

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
    marginBottom: 15,
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
    // marginBottom: 5,
  },
  value: {
    fontSize: 17,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    elevation: 5,
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#29B6F6',
  }
});