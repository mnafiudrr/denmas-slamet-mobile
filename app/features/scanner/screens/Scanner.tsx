import {CompositeNavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, ActivityIndicator, Platform, Dimensions, Text, Image, Button, ImageBackground,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {heightPercentageToDP, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AppView from '~/app/core/component/AppView';
import Visible from '~/app/core/component/Visible';
import ScannerScreens from '../config/Screens';

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
    paddingBottom: wp(5),
    width: wp(50),
    height: wp(10),
  },
  footer: {
    padding: Platform.OS === 'android' ? wp(3) : (heightScreen < 700 ? wp(2) : 0),
    fontSize: wp(100) < 600 ? wp(3.8) : wp(100) < 700 ? wp(2.8) : wp(2),
    color: 'grey',
    textAlign: 'center',
    marginTop: wp(2),
  },
  loader: {
    marginTop: wp(5),
  }
});

type BarCodeScannedProps = {
  type: string,
  data: string,
}

export default function Scanner({navigation}: {navigation: CompositeNavigationProp<any, any>}) {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: BarCodeScannedProps) => {
    setScanned(true);
    ScannerScreens.RESULT.navigate(navigation, {
      data: {type, value: data}
    })
  };

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <AppView withSafeArea withHeader={false} style={{ backgroundColor: '#000000' }}>
      <View style={styles.container}>
        <Visible visible={!scanned}>
          {/* <View style={{ width: wp(100), height: heightPercentageToDP(100) }}> */}
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          {/* </View> */}
        </Visible>
        <ImageBackground source={require('~/assets/scanner.png')} style={{ width: 400, height: 400, opacity: 0.5 }}/>
        <Visible visible={scanned}>
          <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
        </Visible>
      </View>
    </AppView>
  );
}
