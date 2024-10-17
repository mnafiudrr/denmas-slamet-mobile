import { CompositeNavigationProp } from '@react-navigation/native';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Pressable } from 'react-native';
import { Alert, Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import AppButton from '~/app/core/component/AppButton';
import AppText from '~/app/core/component/AppText';
import AppView from '~/app/core/component/AppView';
import InputForm, { inputHandle } from '~/app/core/component/InputForm';
import { showLoading } from '~/app/core/utils/loader';
import { REGISTER_PATH } from '~/app/service/ApiServices';
import { Ionicons } from '@expo/vector-icons'; 
import AppYesNo from '~/app/core/component/AppYesNo';


export default function SignUp({ navigation }: { navigation: CompositeNavigationProp<any, any> }) {

  const [showPassword, setShowPassword] = useState(false)
  const [data, setData] = useState({
    name: '',
    phone: '',
    username: '',
    password: '',
    gender: false,
  })

  const refPhone = useRef<inputHandle>(null);
  const refUsername = useRef<inputHandle>(null);
  const refPassword = useRef<inputHandle>(null);

  const validate = (): boolean => {
    const requiredFields = [
      data.name,
      data.phone,
      data.username,
      data.password,
      data.gender,
    ];
    if (requiredFields.some(field => field === undefined || field === '')) {
      return false;
    }
    return true;
  }

  const toggleSignUp = async() => {
    if (!validate()) 
      return Alert.alert('Daftar', 'Silahkan isi semua form');

    showLoading(true);
    try {
      
      const promise = await axios({
        method: 'post',
        url: REGISTER_PATH,
        timeout: 15000,
        data: {
          fullname: data.name,
          phone: data.phone,
          username: data.username,
          gender: data.gender ? 'pria' : 'wanita',
          password: data.password,
          password_confirmation: data.password,
        }
      });

      Alert.alert('Daftar', 'Daftar berhasil, silahkan login');
      navigation.navigate('Auth/Login');

    } catch (error: any) {

      if (error.response && error.response.data && error.response.data.errors) {
        const errorData = error.response.data.errors;
        const errorKeys = Object.keys(errorData);
        const errorMessage = errorData[errorKeys[0]][0];
        Alert.alert('Daftar', errorMessage);
      } else {
        Alert.alert('Daftar', 'Daftar gagal, silahkan coba lagi');
      }
      
    }
    showLoading(false);
  }

  return (
    <AppView withSafeArea withHeader title="Kembali">
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={require("~/assets/images/logo-new.png")}
            style={styles.logo}
          />
          <View style={styles.formBox}>
            <AppText style={styles.label}>Nama</AppText>
            <InputForm
              placeholder="Nama"
              onSubmitEditing={() => refPhone.current?.onFocus()}
              returnKeyType="next"
              value={data.name}
              onChangeText={(value) => setData({ ...data, name: value })}
              style={styles.form}
            />
            <AppText style={styles.label}>Jenis Kelamin</AppText>
            <AppYesNo
              value={data.gender}
              onValueChange={(value) => setData({ ...data, gender: value })}
              style={styles.checkbox}
              customLabel={{ yes: 'Pria', no: 'Wanita' }}
            />
            <AppText style={styles.label}>No HP</AppText>
            <InputForm
              ref={refPhone}
              placeholder="No HP"
              onSubmitEditing={() => refUsername.current?.onFocus()}
              returnKeyType="next"
              keyboardType="numeric"
              value={data.phone}
              onChangeText={(value) => setData({ ...data, phone: value })}
              style={styles.form}
            />
            <AppText style={styles.label}>Username</AppText>
            <InputForm
              ref={refUsername}
              placeholder="Username"
              onSubmitEditing={() => refPassword.current?.onFocus()}
              returnKeyType="next"
              value={data.username}
              onChangeText={(value) => setData({ ...data, username: value })}
              style={styles.form}
            />
            <AppText style={styles.label}>Password</AppText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <InputForm
                placeholder="Password"
                value={data.password}
                onChangeText={(value) => setData({ ...data, password: value })}
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
            <AppButton style={styles.button} onPress={toggleSignUp}>
              Daftar
            </AppButton>
          </View>
        </View>
      </ScrollView>
    </AppView>
  );
}

const heightScreen = Dimensions.get('screen').height;
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
  footer: {
    bottom: 0,
  },
  checkbox: {
    marginBottom: 10,
  },
});