import { View, Alert, StyleSheet, Image, BackHandler, Pressable, TouchableOpacity, ImageBackground } from 'react-native';
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
import ProfileScreen from '../../profile/config/Screens';
import PrinsipScreen from '../../prinsip/config/Screens';
import FaqScreen from '../../faq/config/Screens';
import { ClinicalFe, CriticalCare, Forum, Stethoscope } from 'healthicons-react-native';
import IntervensiScreen from '../../intervensi/config/Screens';
import AppButtonCustom from '~/app/core/component/AppButtonCustom';

export default function Home({ navigation }: { navigation: CompositeNavigationProp<any, any> }) {
  
  const { setIsLoggedIn, userData } = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Keluar",
          "Apakah anda yakin ingin keluar?",
          [
            {
              text: "Ya",
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

  const togglePeriksaStatusGizi = () => {
    return HealthyScreen.STATUS_GIZI.navigate(navigation, { profile_id: userData.profile_id });
  }

  const toggleRiwayat = () => {
    if (!userData.is_admin)
      return HistoryScreen.HISTORY.navigate(navigation, { profile_id: userData.profile_id });
    return HistoryScreen.LIST_USER.navigate(navigation, { access_type: 'history'});
  }

  return (
    <AppView withSafeArea>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Pressable
            style={styles.profile}
            onPress={() => ProfileScreen.PROFILE.navigate(navigation)}
          >
            <Ionicons name="person-circle" size={24} color="white" />
            <AppText bold style={styles.topHeaderText}>
              {userData.fullname}
            </AppText>
          </Pressable>
          <MaterialIcons
            name="history"
            size={24}
            color="white"
            onPress={toggleRiwayat}
          />
        </View>
        <View style={styles.mainContent}>
          <Image
            source={require("~/assets/images/logo-new.png")}
            style={styles.logo}
          />
          <Image
            source={require("~/assets/images/denmas-slamet.png")}
            style={styles.denmasSlamet}
          />
          <AppText style={styles.subTitle}>
            Menjaga kesehatan adalah investasi terbaik untuk masa depan, Cek
            status kesehatanmu sekarang!
          </AppText>
          <AppButtonCustom
            style={styles.button}
            styleContent={styles.buttonContent}
            onPress={() => PrinsipScreen.PRINSIP.navigate(navigation)}
          >
            <View style={styles.buttonLeftArea}>
              <AppText bold style={styles.title}>
                Prinsip 3J
              </AppText>
              <AppText bold style={styles.buttonSubtitle}>
                Prinsip pengaturan makan pada penderita Diabetes Melitus
              </AppText>
            </View>
            <Image 
              source={require("~/assets/images/food.png")}
              style={styles.buttonRightArea} 
            />
          </AppButtonCustom>
        </View>
      </View>
      {userData.is_admin && false ? (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => HealthyScreen.FORM_PMT.navigate(navigation)}
        >
          <AppText style={{ color: "#ffffff" }} bold>
            PMT
          </AppText>
        </TouchableOpacity>
      ) : null}
      <ImageBackground
        source={require("~/assets/images/bg-main.png")}
        imageStyle={{ borderRadius: 15 }}
        style={styles.bottomNavigationBar}
      >
        <Pressable style={styles.bottomNavButton} onPress={toggleCekKesehatan}>
          <Stethoscope width={26} height={26} color="white" />
          <AppText style={styles.bottomNavText}>Periksa</AppText>
        </Pressable>
        <Pressable
          style={styles.bottomNavButton}
          onPress={togglePeriksaStatusGizi}
        >
          <ClinicalFe width={26} height={26} color="white" />
          <AppText style={styles.bottomNavText}>Status Gizi</AppText>
        </Pressable>
        <Pressable
          style={styles.bottomNavButton}
          onPress={() =>
            IntervensiScreen.DAFTAR_INTERVENSI.navigate(navigation)
          }
        >
          <CriticalCare width={26} height={26} color="white" />
          <AppText style={styles.bottomNavText}>Intervensi</AppText>
        </Pressable>
        <Pressable
          style={styles.bottomNavButton}
          onPress={() => FaqScreen.FAQ.navigate(navigation)}
        >
          <Forum width={26} height={26} color="white" />
          <AppText style={styles.bottomNavText}>FAQ</AppText>
        </Pressable>
      </ImageBackground>
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: "90%",
    maxWidth: 450,
    elevation: 10,
    height: 130,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  buttonLeftArea: {
    flex: 3,
  },
  buttonRightArea: {
    width: 130,
    height: 130,
    marginRight: -30,
  },
  headerView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 20,
  },
  profile: {
    flexDirection: "row",
  },
  topHeaderText: {
    fontSize: 18,
    paddingLeft: 5,
    color: "#ffffff",
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 100,
  },
  logo: {
    maxWidth: 180,
    maxHeight: 180,
    marginTop: -120,
    alignSelf: "center",
  },
  denmasSlamet: {
    width: "100%",
    height: 30,
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
  },
  buttonSubtitle: {
    fontSize: 11,
    color: "black",
    paddingRight: 30,
  },
  subTitle: {
    fontSize: 11,
    color: "gray",
    paddingHorizontal: 50,
    textAlign: "center",
    marginBottom: 30,
  },
  bottomContent: {
    alignItems: "center",
  },
  image: {
    width: "100%",
    marginBottom: "-20%",
  },
  floatingButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 20,
    right: 20,
    height: 40,
    backgroundColor: "#29B6F6",
    borderRadius: 100,
    elevation: 5,
  },
  bottomNavigationBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 100,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 15,
  },
  bottomNavButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 60,
    height: 60,
  },
  bottomNavText: {
    fontSize: 10,
    color: "white",
  },
});