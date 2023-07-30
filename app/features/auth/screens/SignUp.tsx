import { CompositeNavigationProp } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import AppButton from '~/app/core/component/AppButton';
import AppText from '~/app/core/component/AppText';
import AppView from '~/app/core/component/AppView';
import InputForm, { inputHandle } from '~/app/core/component/InputForm';


export default function SignUp({ navigation }: { navigation: CompositeNavigationProp<any, any> }) {

  const [data, setData] = useState({
    name: '',
    phone: '',
    username: '',
    password: '',
  })

  const refPhone = useRef<inputHandle>(null);
  const refUsername = useRef<inputHandle>(null);
  const refPassword = useRef<inputHandle>(null);

  return (
    <AppView withSafeArea withHeader title='Back'>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.formBox}>
            <AppText style={styles.title} bold>Sign Up</AppText>
            <AppText style={styles.label}>Name</AppText>
            <InputForm 
              placeholder="Nama" 
              onSubmitEditing={() => refPhone.current?.onFocus()}
              returnKeyType="next"
              value={data.name} 
              onChangeText={(value) => setData({...data, name: value})} 
              style={styles.form}/>
            <AppText style={styles.label}>No HP</AppText>
            <InputForm 
              ref={refPhone}
              placeholder="No HP" 
              onSubmitEditing={() => refUsername.current?.onFocus()}
              returnKeyType="next"
              value={data.phone} 
              onChangeText={(value) => setData({...data, phone: value})} 
              style={styles.form}/>
            <AppText style={styles.label}>Username</AppText>
            <InputForm 
              ref={refUsername}
              placeholder="Username" 
              onSubmitEditing={() => refPassword.current?.onFocus()}
              returnKeyType="next"
              value={data.username} 
              onChangeText={(value) => setData({...data, username: value})} 
              style={styles.form}/>
            <AppText style={styles.label}>Password</AppText>
            <InputForm 
              placeholder="Password" 
              value={data.password} 
              onChangeText={(value) => setData({...data, password: value})} 
              style={styles.form} 
              ref={refPassword} 
              secureTextEntry
            />
            <AppButton style={styles.button} onPress={() => navigation.goBack()}>
              Sign Up
            </AppButton>
          </View>
          <View style={styles.footer}>
            <Image source={require('~/assets/images/person-signup.png')} style={styles.logo} />
          </View>
        </View>
      </ScrollView>
    </AppView>
  )
}

const heightScreen = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // height: heightScreen-20,
  },
  formBox: {
    width: '100%',
    padding: 20,
    flex: 1,
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
  logo: {
    width: '100%',
  },
});