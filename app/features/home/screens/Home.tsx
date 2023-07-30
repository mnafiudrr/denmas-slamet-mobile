import { View, Alert, StyleSheet, Image, BackHandler } from 'react-native';
import React, { useContext } from 'react';
import AppView from '~/app/core/component/AppView';
import { CompositeNavigationProp, useFocusEffect } from '@react-navigation/native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons'; 
import { AuthContext } from '~/app/core/config/AuthContext';
import AppText from '~/app/core/component/AppText';
import AppButton from '~/app/core/component/AppButton';
import HealthyScreen from '../../healthy/config/Screens';
import HistoryScreen from '../../history/config/Screens';
import { LOGOUT_PATH } from '~/app/service/ApiServices';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showLoading } from '~/app/core/utils/loader';

export default function Home({ navigation }: { navigation: CompositeNavigationProp<any, any> }) {
  
  const { setIsLoggedIn, userData } = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Sign Out",
          "You sure to Sign Out??",
          [
            {
              text: "Yep",
              onPress: requestLogout,
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

  const requestLogout = async () => {
    showLoading(true);
    try {
      const promise = await axios({
        method: 'post',
        url: LOGOUT_PATH,
        timeout: 15000,
        headers: {
          'Authorization': `Bearer ${userData.token}`
        }
      });
    } catch (error) {
    }
      
    AsyncStorage.removeItem('token');
    showLoading(false);
    setIsLoggedIn(false);
  }

  const toggleCekKesehatan = () => {
    if (!userData.is_admin)
      return HealthyScreen.FORM_PREGNANCY.navigate(navigation, { profile_id: userData.profile_id });
    return HistoryScreen.LIST_USER.navigate(navigation, { access_type: 'healthy'});
  }

  const toggleRiwayat = () => {
    if (!userData.is_admin)
      return HistoryScreen.HISTORY.navigate(navigation, { profile_id: userData.profile_id });
    return HistoryScreen.LIST_USER.navigate(navigation, { access_type: 'history'});
  }

  return (
    <AppView withSafeArea imageBg={require('~/assets/images/bg-home.png')}
    >
      <View style={styles.container}>
        <View style={styles.headerView}>
          <View style={styles.profile}>
            <Ionicons name="ios-person-circle" size={24} color="black" />
            <AppText bold style={styles.topHeaderText}>{userData.name}</AppText>
          </View>
          <MaterialIcons name="history" size={24} color="black" onPress={toggleRiwayat} />
        </View>
        <AppText bold style={styles.title}>{`Selamat Datang\ndi Denmas Slamet`}</AppText>
        <AppText style={styles.subTitle}>Cari tahu status kesehatanmu dengan tekan tombol di bawah</AppText>
      </View>
      <View style={styles.bottomContent}>
        <AppButton style={styles.button} onPress={toggleCekKesehatan}>
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