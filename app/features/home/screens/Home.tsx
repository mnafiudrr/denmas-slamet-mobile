import { View, Text, Alert, Button, StyleSheet, ScrollView, Image, TouchableOpacity, BackHandler } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import AppView from '~/app/core/component/AppView';
import { CompositeNavigationProp, useFocusEffect } from '@react-navigation/native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons'; 
import { AuthContext } from '~/app/core/config/AuthContext';
import AppText from '~/app/core/component/AppText';
import AppButton from '~/app/core/component/AppButton';

export default function Home({ navigation }: { navigation: CompositeNavigationProp<any, any> }) {
  
  const { setIsLoggedIn } = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Sign Out",
          "You sure to Sign Out??",
          [
            {
              text: "Yep",
              onPress: () => setIsLoggedIn(false),
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
    <AppView withSafeArea imageBg={require('~/assets/images/bg-home.png')}
    >
      <View style={styles.container}>
        <View style={styles.headerView}>
          <View style={styles.profile}>
            <Ionicons name="ios-person-circle" size={24} color="black" />
            <AppText bold style={styles.topHeaderText}>Joko Widodo</AppText>
          </View>
          <MaterialIcons name="history" size={24} color="black" />
        </View>
        <AppText bold style={styles.title}>{`Selamat Datang\ndi Denmas Slamet`}</AppText>
        <AppText style={styles.subTitle}>Cari tahu status kesehatanmu dengan tekan tombol di bawah</AppText>
      </View>
      <View style={styles.bottomContent}>
        <AppButton style={styles.button}>
          Cek Kesehatan
        </AppButton>
        <Image source={require('~/assets/images/person-home.png')} style={styles.image}/>
      </View>
    </AppView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    width: '60%',
    maxWidth: 250,
    elevation: 10,
  },
  headerView: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'space-between',
  },
  profile: {
    flexDirection: 'row',
  },
  topHeaderText: {
    fontSize: 18,
    paddingLeft: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 11,
    color: '#ffffff',
  },
  bottomContent: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    marginBottom: '-20%',
  }
});