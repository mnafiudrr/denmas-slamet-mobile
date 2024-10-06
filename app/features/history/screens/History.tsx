import { CompositeNavigationProp } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import AppText from '~/app/core/component/AppText';
import AppView from '~/app/core/component/AppView';
import ResultScreen from '../../result/config/Screens';
import { MaterialIcons } from "@expo/vector-icons"; 
import { showLoading } from '~/app/core/utils/loader';
import axios from 'axios';
import { REPORT_PATH } from '~/app/service/ApiServices';
import { AuthContext } from '~/app/core/config/AuthContext';
import { formatDate } from '~/app/core/utils/formatter';
import AppButtonCustom from '~/app/core/component/AppButtonCustom';

type Props = {
  route: any,
}

export default function History({ navigation, route }: { navigation: CompositeNavigationProp<any, any> } & Props) {

  const { profile_id } = route.params;

  type dataTypes = {
    id: string,
    name: string,
    date: string,
  }

  const [data, setData] = useState<dataTypes[]>([]);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    getRiwayat();
  },[]);

  const getRiwayat = async() => {
    showLoading(true);
    try {
      const promise = await axios({
        method: 'get',
        url: `${REPORT_PATH}?profile_id=${profile_id}`,
        timeout: 15000,
        headers: {
          Authorization: `Bearer ${userData.token}`,
          Accept: 'application/json',
        },
      });
      
      const response = promise.data.data.map((item: any) => {
        return { 
          id: item.id,
          name: item.name,
          date: formatDate(item.created_at) 
        };
      });

      setData(response);
      
    } catch (error) {
      
    }
    showLoading(false);
  }

  const selectResult = async (id: string) => {

    showLoading(true);

    try {

      const promise = await axios({
        method: 'get',
        url: `${REPORT_PATH}/${id}`,
        timeout: 15000,
        headers: {
          Authorization: `Bearer ${userData.token}`,
          Accept: 'application/json',
        },
      });

      const response = promise.data.data;

      const result_res = response.result;
      const health_res = response.health;

      const result = {
        id: response.id,
        name: response.profile.fullname,
        date: formatDate(response.created_at),
        imt: `${result_res.imt} (${result_res.status_imt})`,
        tekanan_darah: `${health_res.tekanan_darah_sistol}/${health_res.tekanan_darah_diastol} (${result_res.status_tekanan_darah})`,
        gula_darah: `${health_res.kadar_gula} (${result_res.status_gula})`,
        hb: `${health_res.kadar_hb} (${result_res.status_hb})`,
        kolesterol: `${health_res.kadar_kolesterol} (${result_res.status_kolesterol})`,
        asam_urat: `${health_res.kadar_asam_urat} (${result_res.status_asam_urat})`,
        statuses: result_res.status,
      }

      ResultScreen.RESULT.navigate(navigation, { data: result });
    } catch (error) {
      
    }

    showLoading(false);

  }

  return (
    <AppView withSafeArea withHeader title="Kembali">
      <ScrollView style={styles.scrollview}>
        <View style={styles.container}>
          <AppButtonCustom
            style={styles.header}
            styleContent={styles.headerContent}
          >
            <View style={styles.headerLeftArea}>
              <AppText bold style={styles.title}>
                Riwayat
              </AppText>
            </View>
            <View style={styles.headerRightArea}>
              <MaterialIcons
                name="history"
                size={110}
                color="black"
                style={{ marginLeft: -1 }}
              />
            </View>
          </AppButtonCustom>
          <View style={styles.formBox}>
            {data.map((item, index) => (
              <Pressable
                key={index}
                style={styles.warpForm}
                onPress={() => selectResult(item.id)}
              >
                <AppText style={styles.label}>Nama</AppText>
                <AppText style={styles.value} bold>
                  {item.name}
                </AppText>
                <AppText style={styles.label}>Tanggal</AppText>
                <AppText style={styles.value} bold>
                  {item.date}
                </AppText>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </AppView>
  );
}

const heightScreen = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  scrollview: {
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 70,
    minHeight: heightScreen - 145,
  },
  formBox: {
    width: "100%",
    paddingHorizontal: 20,
    flex: 1,
    overflow: "hidden",
    marginTop: 20,
  },
  header: {
    width: "90%",
    maxWidth: 450,
    elevation: 10,
    height: 130,
    marginTop: -60,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  headerLeftArea: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  headerRightArea: {
    width: 130,
    height: 130,
    marginRight: -30,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 130,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 15,
    color: "white",
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