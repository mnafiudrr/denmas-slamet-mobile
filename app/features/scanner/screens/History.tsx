import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, Platform, Dimensions, Text, ToastAndroid, TouchableOpacity, Alert, Linking, ScrollView, Pressable,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AppView from '~/app/core/component/AppView';
import * as Clipboard from 'expo-clipboard';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'; 
import Visible from '~/app/core/component/Visible';

const heightScreen = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default function History() {
  
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
  const [data, setData] = useState([{ data:'', created_at: '' }]);

  useEffect(() => {
    getData();
  //   const prevRoute = routes[routes.length - 2].name; // if Scanner then save to the history
  },[]);
  
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@scan_history')
      setData( jsonValue != null ? JSON.parse(jsonValue) : [] );
    } catch(e) {
      // error reading value
    }
  }

  const removeData =async () => {
    try {
      const jsonValue = JSON.stringify([]);
      await AsyncStorage.setItem('@scan_history', jsonValue);
      setData([]);
      ToastAndroid.show('Deleted', ToastAndroid.SHORT);
    } catch (e) {
      // saving error
    }
  }

  const copyToClipboard = async (value: string) => {
    await Clipboard.setStringAsync(value);
    ToastAndroid.show('Copied', ToastAndroid.SHORT);
  };

  return (
    <AppView withSafeArea withHeader={false}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between' }}>
          <Text
          style={{ 
            fontSize: 20,
            fontWeight: 'bold',
          }}
          >History</Text>
          <Pressable onPress={removeData}>
            <MaterialCommunityIcons name="trash-can-outline" size={24} color="black" />
          </Pressable>
        </View>
        <Visible visible={data.length > 0}>
          <ScrollView style={{ borderRadius: 10 }}>
            {
              data.map((item, key) => {
                return (
                    <TouchableOpacity 
                    onLongPress={() => copyToClipboard(item.data)}
                    key={key} 
                    style={[{ borderBottomWidth: 1, padding: 10, borderRadius: 10 }, key == 0? { borderTopWidth: 1 } : null]}>
                      <Text style={{ fontSize: 15 }}>{item.data}</Text>
                      <Text style={{ fontSize: 10, marginTop: 3, textAlign: 'right' }}>{item.created_at}</Text>
                    </TouchableOpacity>
                );
              })
            }
          </ScrollView>
        </Visible>
        <Visible visible={data.length == 0}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Entypo name="emoji-sad" size={104} color="black" />
              <Text style={{ fontSize: 20 }}>{`You don't have any history :(`}</Text>
            </View>
        </Visible>
      </View>
    </AppView>
  );
}
