import { CompositeNavigationProp } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import AppText from '~/app/core/component/AppText';
import AppView from '~/app/core/component/AppView';
import ResultScreen from '../../result/config/Screens';
import { showLoading } from '~/app/core/utils/loader';
import axios from 'axios';
import { PROFILE_PATH, REPORT_PATH } from '~/app/service/ApiServices';
import { AuthContext } from '~/app/core/config/AuthContext';
import { formatDate } from '~/app/core/utils/formatter';
import HistoryScreen from '../config/Screens';
import HealthyScreen from '../../healthy/config/Screens';

type Props = {
  route: any,
}

export default function ListUser({ navigation, route }: { navigation: CompositeNavigationProp<any, any> } & Props) {

  const { access_type } = route.params;

  type dataTypes = {
    id: string,
    fullname: string,
    gender: string,
  }

  const [data, setData] = useState<dataTypes[]>([]);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    getUsers();
  },[]);

  const getUsers = async() => {
    showLoading(true);
    try {
      const promise = await axios({
        method: 'get',
        url: `${PROFILE_PATH}`,
        timeout: 15000,
        headers: {
          Authorization: `Bearer ${userData.token}`,
          Accept: 'application/json',
        },
      });

      const response = promise.data.data.filter((item: any) => !item.is_admin).map((item: any) => {
        return { 
          id: item.id,
          fullname: item.fullname,
          gender: item.gender,
          birthday: formatDate(item.birthday) 
        };
      });

    } catch (error) {
      
    }
    showLoading(false);
  }

  const selectResult = async (id: string, gender: string) => {
    
    if (access_type === 'history') {
      HistoryScreen.HISTORY.navigate(navigation, { profile_id: id });
    } else if (access_type === 'healthy') {
      HealthyScreen.FORM_PREGNANCY.navigate(navigation, {
        profile_id: id,
        gender: gender,
      });
    }

  }

  return (
    <AppView withSafeArea withHeader title="Kembali">
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.formBox}>
            <AppText style={styles.title} bold>Daftar Pengguna</AppText>
            {
              data.map((item, index) => (
                <Pressable key={index} style={styles.warpForm} onPress={() => selectResult(item.id, item.gender)}>
                  <AppText style={styles.value} bold>{item.fullname}</AppText>
                </Pressable>
              ))
            }
          </View>
        </View>
      </ScrollView>
    </AppView>
  )
}

const heightScreen = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    minHeight: heightScreen - 35,
    marginHorizontal: 5,
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
    marginTop: 20,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 15,
  },
  warpForm: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  label: {
    fontSize: 15,
    // marginBottom: 5,
  },
  value: {
    fontSize: 17,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    elevation: 5,
    backgroundColor: "#fff",
  },
  buttonText: {
    color: "#29B6F6",
  },
});