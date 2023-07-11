import { View, Text, Alert, Button, StyleSheet, ScrollView, Image, TouchableOpacity, BackHandler } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import AppView from '~/app/core/component/AppView';
import { CompositeNavigationProp, useFocusEffect } from '@react-navigation/native';
import ScannerScreens from '../../scanner/config/Screens';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function Home({ navigation }: { navigation: CompositeNavigationProp<any, any> }) {

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Whyyy",
          "You sure to exit this app??",
          [
            {
              text: "Exit App",
              onPress: () => BackHandler.exitApp(),
              style: "default",
            },
          ],
          {
            cancelable: true,
          }
        )
        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [])
  );

  return (
    <AppView withSafeArea 
    // style={{ backgroundColor: '#0d0d0d' }}
    >
      {/* <ScrollView
        showsVerticalScrollIndicator={false}> */}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 15, marginTop: 10 }}>
        <TouchableOpacity onPress={() => ScannerScreens.HISTORY.navigate(navigation)}>
          <MaterialIcons name="history" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.topHeaderText}>
            Scan QR Code
          </Text>
          <Text style={styles.topContentText}>
            To scan your QR can tap on the bottom button.
            {'\n'}Try it out!
          </Text>
        </View>
        <Image style={styles.logo} source={ require('~/assets/qr-scan.png') }/>
        <TouchableOpacity style={styles.button} onPress={ () => ScannerScreens.SCANNER.navigate(navigation)}>
          <Text style={styles.buttonText}>
            Scan
          </Text>
        </TouchableOpacity>
        {/* </ScrollView> */}
      </View>
    </AppView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 180,
    height: 40,
    backgroundColor: '#256FDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
  headerView: {
    backgroundColor: '#c5c5c5',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 390,
    marginBottom: 30
  },
  topHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    // color: 'white'
  },
  topContentText: {
    fontSize: 16,
    textAlign: 'center',
  },
  logo: {
    width: 350,
    height: 350,
    marginBottom: 50,
  },
});