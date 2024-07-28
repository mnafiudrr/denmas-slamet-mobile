import React, { useContext, useRef, useState } from 'react';
import { BackHandler, Alert, View, Image, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native';
import AppView from '~/app/core/component/AppView';
import AppText from '~/app/core/component/AppText';
import { CompositeNavigationProp, useFocusEffect } from '@react-navigation/native';
import InputForm, { inputHandle } from '~/app/core/component/InputForm';
import AppButton from '~/app/core/component/AppButton';
import { AuthContext } from '~/app/core/config/AuthContext';
import axios from 'axios';
import { LOGIN_PATH } from '~/app/service/ApiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showLoading } from '~/app/core/utils/loader';
import { Ionicons } from '@expo/vector-icons'; 


const heightScreen = Dimensions.get('screen').height;

export default function Login({ navigation }: { navigation: CompositeNavigationProp<any, any> }) {

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Are you sure you want to exit?',
          'Press Yes to exit',
          [
            {
              text: 'Yes',
              onPress: () => BackHandler.exitApp(),
            }
          ]
        )
        return true;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [])
  );

  const { setIsLoggedIn, setUserData } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [auth, setAuth] = useState({
    username: '',
    password: '',
  });
  const refPassword = useRef<inputHandle>(null);

  const toggleLogin = async () => {
    showLoading(true);
    try {
      const promise = await axios({
        method: 'post',
        url: LOGIN_PATH,
        timeout: 15000,
        data: {
          username: auth.username,
          password: auth.password,
        }
      });

      const response = promise.data;

      if (response.message === 'Login successful') {

        await AsyncStorage.setItem('token', response.token);

        setUserData({...response.user, token: response.token});
        showLoading(false);
        setIsLoggedIn(true);
      }
      
    } catch (error) {
      showLoading(false);
      Alert.alert('Error', 'Username atau Password salah');
    }
  }

  return (
    <AppView withSafeArea imageBg={require('~/assets/images/bg-login.png')}>
      <ScrollView>
        <AppText style={{ fontSize: 12, textAlign: 'right', marginRight: 10 }}>Version 1.2.0  </AppText>
        <View style={styles.container}>
          <Image source={require('~/assets/images/logo.png')} style={styles.logo} />
          <View style={styles.formBox}>
            <AppText style={styles.title} bold>Masuk</AppText>
            <AppText style={styles.label}>Username / No HP</AppText>
            <InputForm 
              placeholder="Username" 
              onSubmitEditing={() => refPassword.current?.onFocus()}
              returnKeyType="next"
              value={auth.username} 
              onChangeText={(value) => setAuth({...auth, username: value})} 
              style={styles.form}/>
            <AppText style={styles.label}>Password</AppText>
            <View style={{ flexDirection:'row', alignItems: 'center' }}>
              <InputForm 
                placeholder="Password" 
                onSubmitEditing={toggleLogin}
                value={auth.password} 
                onChangeText={(value) => setAuth({...auth, password: value})} 
                  style={styles.form} 
                ref={refPassword} 
                secureTextEntry={!showPassword}
                />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="black" style={{ marginTop: -8, marginLeft: -35 }} />
              </Pressable>
            </View>
            <AppButton style={styles.button} onPress={toggleLogin}>
              Masuk
            </AppButton>
            {/* <AppText style={{ alignSelf: 'center' }}>Don't have account?</AppText> */}
          </View>
        </View>
        <Pressable style={styles.containerFooter} onPress={() => navigation.navigate('Auth/Signup')}>
          <AppText style={styles.footer} bold>Daftar</AppText>
        </Pressable>
      </ScrollView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: '35%',
    // backgroundColor: 'red',
    height: heightScreen - 65,
  },
  logo: {
    maxWidth: 200,
    maxHeight: 200,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  formBox: {
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
  },
  form: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  containerFooter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'flex-end',
    // right: 0,
    height: 50,
    // backgroundColor: 'red',
  },
  footer: {
    padding: 15,
    color: '#29B6F6',
  },
});