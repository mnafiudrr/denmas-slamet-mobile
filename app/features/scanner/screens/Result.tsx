import {CompositeNavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import {
  StyleSheet, View, Platform, Dimensions, Text, ToastAndroid, TouchableOpacity, Alert, Linking, BackHandler,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AppView from '~/app/core/component/AppView';
import * as Clipboard from 'expo-clipboard';

import HomeScreen from '../../home/config/Screens';

const heightScreen = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: { 
    backgroundColor: 'white',
    width: 350,
    padding: 10,
    borderRadius: 5
  },
  label: {
    fontSize: 13,
  },
  value: {
    fontSize: 15,
    paddingHorizontal: 19,
  },
  containerFooter: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  footer: {
    padding: Platform.OS === 'android' ? wp(3) : (heightScreen < 700 ? wp(2) : 0),
    fontSize: wp(100) < 600 ? wp(3.8) : wp(100) < 700 ? wp(2.8) : wp(2),
    color: 'grey',
    textAlign: 'center',
    marginTop: wp(2),
  },
  button: {
    width: 140,
    height: 30,
    backgroundColor: '#256FDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 10
  },
  buttonText: {
    fontSize: 15,
    color: 'white'
  },
});

type ResultProps = {
  route?: any
};

export default function Result({ route }: ResultProps) {
  
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
  const { data } = route.params;
  const routes = navigation.getState()?.routes;

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        HomeScreen.HOME.navigate(navigation);
        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [])
  );

  useEffect(() => {
    const prevRoute = routes[routes.length - 2].name; // if Scanner then save to the history
    isValidHttpUrl(data.value);
  },[]);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(data.value);
    ToastAndroid.show('Copied', ToastAndroid.SHORT);
  };

  async function isValidHttpUrl(value: string) {
    const supported = await Linking.canOpenURL(value);
    if (supported){
      Alert.alert(
        "Information",
        "Your qr is URL format, wanna open with your browser?",
        [
          {
            text: "Open browser",
            onPress: async () => await Linking.openURL(value),
            style: "default",
          },
        ],
        {
          cancelable: true,
        }
      )
    }
  }
  
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@scan_history');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }

  const storeData = async (value: object[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@scan_history', jsonValue);
    } catch (e) {
      // saving error
    }
  }

  async function saveLocalStorage() {
    var history = await getData();
    var m = new Date();
    var dateString =
        m.getFullYear() + "-" +
        ("0" + (m.getMonth()+1)).slice(-2) + "-" +
        ("0" + m.getDate()).slice(-2) + " " +
        ("0" + m.getHours()).slice(-2) + ":" +
        ("0" + m.getMinutes()).slice(-2) + ":" +
        ("0" + m.getSeconds()).slice(-2);
    
    storeData([{
      data: data.value,
      created_at: dateString,
    }, ...history]);
  }

  return (
    <AppView withSafeArea withHeader={false} style={{ backgroundColor: '#256FDC' }}>
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 30, fontSize: 25, fontWeight: 'bold', color: 'white' }}>
          Scan Result
        </Text>
        <View style={styles.box}>
          {/* <View>
            <Text style={styles.label}>
              Type :
            </Text>
            <Text style={styles.value}>
              {data.type}
            </Text>
          </View> */}
          <View>
            <Text style={styles.label}>
              Data :
            </Text>
            <View style={{ backgroundColor: '#e9e9e9', borderRadius: 5, paddingVertical: 5 }}>
              <Text style={styles.value}>
                {data.value}
              </Text>
              <TouchableOpacity 
              onPress={copyToClipboard}
              style={{ 
                alignSelf: 'flex-end', 
                paddingHorizontal: 15, 
                backgroundColor: '#d9d9d9', 
                borderRadius: 5, 
                // marginBottom: 5,
                marginRight: 5,
                padding: 4,
                marginTop: -5
                }}>
                <Text style={{ fontSize: 11, fontWeight: 'bold' }}>
                  Copy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => saveLocalStorage()}>
            <Text style={styles.buttonText}>
              Save to History
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerFooter}>
        <Text style={styles.footer}> Made by Fuifiu</Text>
      </View>
    </AppView>
  );
}
