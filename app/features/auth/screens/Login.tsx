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

        if (typeof response.user.is_admin != "boolean")
          response.user.is_admin = parseInt(response.user.is_admin);

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
    <AppView withSafeArea>
      <ScrollView>
        <AppText style={{ fontSize: 12, textAlign: "right", marginRight: 10, color: "white" }}>
          Version 2.0.3{" "}
        </AppText>
        <View style={styles.container}>
          <Image
            source={require("~/assets/images/logo-new.png")}
            style={styles.logo}
          />
          <View style={styles.formBox}>
            <Image
              source={require("~/assets/images/selamat-datang.png")}
              style={styles.selamatDatang}
            />
            <AppText style={styles.subtitle}>
              {`Masukkan username dan\npassword anda untuk masuk`}
            </AppText>
            <AppText style={styles.label}>Username / No HP</AppText>
            <InputForm
              placeholder="Username"
              onSubmitEditing={() => refPassword.current?.onFocus()}
              returnKeyType="next"
              value={auth.username}
              onChangeText={(value) => setAuth({ ...auth, username: value })}
              style={styles.form}
            />
            <AppText style={styles.label}>Password</AppText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <InputForm
                placeholder="Password"
                onSubmitEditing={toggleLogin}
                value={auth.password}
                onChangeText={(value) => setAuth({ ...auth, password: value })}
                style={styles.form}
                ref={refPassword}
                secureTextEntry={!showPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="black"
                  style={{ marginTop: -8, marginLeft: -35 }}
                />
              </Pressable>
            </View>
            <AppButton style={styles.button} onPress={toggleLogin}>
              Masuk
            </AppButton>
          </View>
          <Pressable
            style={styles.floatingButton}
            onPress={() => navigation.navigate("Auth/Signup")}
          >
            <AppText style={styles.footer} bold>
              Daftar
            </AppText>
          </Pressable>
        </View>
      </ScrollView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginTop: 120,
    marginBottom: 30,
    marginHorizontal: 20,
    paddingBottom: 30,
  },
  logo: {
    width: 180,
    height: 180,
    marginTop: -120,
    alignSelf: "center",
  },
  formBox: {
    width: "100%",
    paddingHorizontal: 20,
    flex: 1,
    overflow: "hidden",
    marginTop: 10,
  },
  selamatDatang: {
    resizeMode: "cover",
    maxWidth: 200,
    height: 50,
    marginLeft: -10,
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 20,
    marginTop: -10,
    color: "gray",
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
    marginBottom: 40,
  },
  footer: {
    color: "black",
  },
  floatingButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 15,
    right: 15,
    height: 20,
    borderRadius: 100,
  },
});