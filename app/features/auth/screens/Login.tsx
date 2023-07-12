import React, { useRef, useState } from 'react';
import { BackHandler, Alert, View, Image, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native';
import AppView from '~/app/core/component/AppView';
import AppText from '~/app/core/component/AppText';
import { CompositeNavigationProp, useFocusEffect } from '@react-navigation/native';
import InputForm, { inputHandle } from '~/app/core/component/InputForm';
import AppButton from '~/app/core/component/AppButton';
import App from '~/App';


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

  const [auth, setAuth] = useState({
    username: '',
    password: '',
  });
  const refPassword = useRef<inputHandle>(null);

  return (
    <AppView withSafeArea imageBg={require('~/assets/images/bg-login.png')}>
      <ScrollView>
        <View style={styles.container}>
          <Image source={require('~/assets/images/logo.png')} style={styles.logo} />
          <View style={styles.formBox}>
            <AppText style={styles.title} bold>Sign In</AppText>
            <AppText style={styles.label}>Username / No HP</AppText>
            <InputForm 
              placeholder="Username" 
              onSubmitEditing={() => refPassword.current?.onFocus()}
              returnKeyType="next"
              value={auth.username} 
              onChangeText={(value) => setAuth({...auth, username: value})} 
              style={styles.form}/>
            <AppText style={styles.label}>Password</AppText>
            <InputForm placeholder="Password" value={auth.password} onChangeText={(value) => setAuth({...auth, password: value})} style={styles.form} 
            ref={refPassword} 
            secureTextEntry
            />
            <AppButton style={styles.button}>
              Sign In
            </AppButton>
            {/* <AppText style={{ alignSelf: 'center' }}>Don't have account?</AppText> */}
          </View>
        </View>
        <Pressable style={styles.containerFooter} onPress={() => navigation.navigate('Auth/Signup')}>
          <AppText style={styles.footer} bold>Sign Up</AppText>
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
    height: heightScreen - 50,
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