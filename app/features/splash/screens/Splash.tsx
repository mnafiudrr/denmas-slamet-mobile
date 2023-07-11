import {CompositeNavigationProp} from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet, View, ActivityIndicator, Platform, Dimensions, Text, Image,
} from 'react-native';
import * as Font from 'expo-font';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AppView from '~/app/core/component/AppView';
import { SplashContext } from '~/app/core/config/SplashContext';
import AppText from '~/app/core/component/AppText';

const heightScreen = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerFooter: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    maxWidth: 200,
    maxHeight: 200,
    // backgroundColor: 'red',
  },
  footer: {
    padding: 15,
    color: 'grey',
    textAlign: 'center',
  },
  loader: {
    marginTop: wp(5),
  }
});

export default function Splash({navigation}: {navigation: CompositeNavigationProp<any, any>}) {

  const { setSplashLoading } = useContext(SplashContext);

  const [fontsLoaded, setfontsLoaded] = useState(false);

  const _loadFontAsync = async () => {
    await Font.loadAsync({
        'roboto': require('~/assets/fonts/roboto/Roboto-Regular.ttf'),
        'roboto_bold': require('~/assets/fonts/roboto/Roboto-Bold.ttf'),
    });
    setfontsLoaded(true);
  };

  useEffect(() => {
    _loadFontAsync();
    setTimeout(() => {
      setSplashLoading(false);
    }, 3000);
  }, []);
  

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: 'blue' }}>
      </View>
    )
  }

  return (
    <AppView withSafeArea withHeader={false}>
      <View style={styles.container}>
        <Image style={styles.logo} source={ require('~/assets/images/logo.png') }/>
        <AppText bold>Denmas Slamet</AppText>
      </View>
      <View style={styles.containerFooter}>
        <ActivityIndicator style={[styles.loader, styles.footer]} size={'small'} color={'grey'} />
      </View>
    </AppView>
  );
}
