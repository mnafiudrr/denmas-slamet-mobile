import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Dimensions, Image, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppButton from '~/app/core/component/AppButton';
import AppText from '~/app/core/component/AppText';
import AppView from '~/app/core/component/AppView';
import AppYesNo from '~/app/core/component/AppYesNo';
import InputForm from '~/app/core/component/InputForm';
import Visible from '~/app/core/component/Visible';
import { formatDate, numberOnly, parseDate } from '~/app/core/utils/formatter';
import HealthyScreen from '../config/Screens';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppPanjangBadan } from '~/app/core/static/AppPanjangBadan';
import { showLoading } from '~/app/core/utils/loader';
import axios from 'axios';
import { NUTRITIONAL_STATUS_HISTORY_PATH } from '~/app/service/ApiServices';
import { AuthContext } from '~/app/core/config/AuthContext';
import HistoryScreen from '../../history/config/Screens';

type Props = {
  route: any,
}

export default function StatusGizi({ route }: Props) {

  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
  const { userData } = useContext(AuthContext);
  const [selectingDate, setSelectingDate] = useState(false);
  const [result, setResult] = useState({
    status: '',
    color: '',
    show: false,
  })

  type dataTypes = {
    tanggal_lahir: string,
    tinggi_badan: string,
    jenis_kelamin?: string,
  }

  const [data, setData] = useState<dataTypes>({
    tanggal_lahir: formatDate(new Date()),
    tinggi_badan: '',
    jenis_kelamin: undefined,
  });

  useEffect(() => {
    setResult({ ...result, show: false });
  },[data])

  const validate = (): boolean => {
    const requiredFields = [
      data.tanggal_lahir,
      data.tinggi_badan,
      data.jenis_kelamin,
    ];
    if (requiredFields.some(field => field === undefined || field === '')) {
      return false;
    }
    return true;
  };

  const togglePeriksa = async () => {
    const isValid = validate();
    if (!isValid)
      return Alert.alert('Peringatan', 'Mohon lengkapi data terlebih dahulu');
    
    const tinggiBadan = parseFloat(data.tinggi_badan);

    const requestData = {
      birth_date: data.tanggal_lahir.split('-').reverse().join('-'),
      gender: data.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan',
      height: tinggiBadan,
    }

    showLoading(true);
    try {
      const promise = await axios({
        method: 'post',
        url: NUTRITIONAL_STATUS_HISTORY_PATH,
        timeout: 15000,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`,
        },
        data: requestData,
      });

      const response = promise.data.data;
      showLoading(false);
      if (response.status === 'Sangat Pendek')
        return setResult({show: true, status: 'Sangat Pendek (Severely Stunted)', color: '#ea0606' });
      else if (response.status === 'Pendek')
        return setResult({show: true, status: 'Pendek (Stunted)', color: '#f53939' });
      else if (response.status === 'Normal')
        return setResult({show: true, status: 'Normal', color: '#00b050' });
      else
        return setResult({show: true, status: 'Tinggi (Tall)', color: '#1FC1E8' });
        
    } catch (error) {
      showLoading(false);
      alert('Terjadi kesalahan');
    }
  }

  const toggleRiwayat = async () => {

    try {
      showLoading(true);
      const promise = await axios({
        method: 'get',
        url: NUTRITIONAL_STATUS_HISTORY_PATH,
        timeout: 15000,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`,
        },
      });

      const response = promise.data.data;

      let histories = [];
      for (let i = 0; i < response.length; i++) {
        const item = response[i];
        histories.push({
          id: item.id,
          data: [
            {
              label: 'Tanggal Lahir',
              value: item.birth_date,
            },
            {
              label: 'Jenis Kelamin',
              value: item.gender,
            },
            {
              label: 'Tinggi Badan',
              value: item.height,
            },
            {
              label: 'Status Gizi',
              value: item.status,
            },
          ]
        });
      }

      showLoading(false);
      HistoryScreen.LIST_DATA.navigate(navigation, { data: histories, access_type: 'status_gizi', title: 'Riwayat Status Gizi' });
      
    } catch (error) {
      showLoading(false);
      
    }

  }

  return (
    <AppView
      withSafeArea
      withHeader
      title="Kembali"
      suffixHeader={
        <TouchableOpacity onPress={toggleRiwayat}>
          <AppText style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
            Riwayat
          </AppText>
        </TouchableOpacity>
      }
    >
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={require("~/assets/images/logo-new.png")}
            style={styles.logo}
          />
          <View style={styles.formBox}>
            <AppText style={styles.title} bold>
              Periksa Status Gizi
            </AppText>
            <AppText style={styles.label}>Tanggal Lahir</AppText>
            <Pressable onPress={() => setSelectingDate(true)}>
              <InputForm
                style={styles.form}
                placeholder="Tanggal Lahir"
                keyboardType="number-pad"
                value={data.tanggal_lahir}
                readonly
              />
            </Pressable>
            <AppText style={styles.label}>Jenis Kelamin</AppText>
            <AppYesNo
              value={
                data.jenis_kelamin === undefined
                  ? undefined
                  : data.jenis_kelamin === "L"
              }
              onValueChange={(value) =>
                setData({ ...data, jenis_kelamin: value ? "L" : "P" })
              }
              customLabel={{
                yes: "Laki-laki",
                no: "Perempuan",
              }}
              style={styles.checkbox}
            />
            <AppText style={styles.label}>Tinggi Badan (cm)</AppText>
            <InputForm
              style={styles.form}
              placeholder="Tinggi Badan"
              keyboardType="number-pad"
              value={data.tinggi_badan}
              onChangeText={(text: string) =>
                setData({ ...data, tinggi_badan: numberOnly(text, 1) })
              }
            />
            {selectingDate && (
              <DateTimePicker
                value={parseDate(data.tanggal_lahir)}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setSelectingDate(false);
                  setData({
                    ...data,
                    tanggal_lahir: selectedDate
                      ? formatDate(selectedDate)
                      : data.tanggal_lahir,
                  });
                }}
                maximumDate={new Date()}
                // minimumDate 61 months ago
                minimumDate={
                  new Date(new Date().setMonth(new Date().getMonth() - 60))
                }
              />
            )}
            <AppButton style={styles.button} onPress={togglePeriksa}>
              Periksa
            </AppButton>
            {result.show && (
              <View style={styles.result}>
                <View style={styles.resultHeaderView}>
                  <AppText style={styles.resultTitle} bold>
                    Hasil
                  </AppText>
                </View>
                <AppText style={styles.resultText}>
                  Tinggi Badan / Umur (TB/U) :
                </AppText>
                <AppText style={[styles.resultStatus, { color: result.color }]}>
                  {result.status}
                </AppText>
              </View>
            )}
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
    marginTop: 120,
    minHeight: heightScreen - 145,
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
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
  },
  form: {
    marginBottom: 10,
  },
  checkbox: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    elevation: 10,
    width: "100%",
  },
  footer: {
    bottom: 0,
  },
  result: {
    width: "100%",
    height: 200,
    marginTop: 20,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
  },
  resultHeaderView: {
    backgroundColor: "rgba(0, 153, 255, 0.7)",
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 40,
  },
  resultTitle: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
    color: "#ffffff",
  },
  resultText: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 5,
  },
  resultStatus: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 5,
    fontWeight: "bold",
  },
});