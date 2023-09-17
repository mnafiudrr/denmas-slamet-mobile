import { CompositeNavigationProp } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, Keyboard, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppButton from '~/app/core/component/AppButton';
import AppText from '~/app/core/component/AppText';
import AppView from '~/app/core/component/AppView';
import InputForm, { inputHandle } from '~/app/core/component/InputForm';
import { formatDate, maxLenght, numberOnly, parseDate } from '~/app/core/utils/formatter';
import ResultScreen from '../../result/config/Screens';
import axios from 'axios';
import { AuthContext } from '~/app/core/config/AuthContext';
import { showLoading } from '~/app/core/utils/loader';
import { PMT_MONITOR_PATH, REPORT_PATH } from '~/app/service/ApiServices';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppYesNo from '~/app/core/component/AppYesNo';
import HistoryScreen from '../../history/config/Screens';

export default function FormPmt({ navigation }: { navigation: CompositeNavigationProp<any, any> }) {

  const { userData } = useContext(AuthContext);
  const refNamaIbu = useRef<inputHandle>(null);
  const refAlamat = useRef<inputHandle>(null);
  const refNoHp = useRef<inputHandle>(null);

  type dataTypes = {
    nama_anak?: string;
    jenis_kelamin?: string;
    usia?: string;
    nama_ibu?: string;
    alamat?: string;
    no_hp?: string;
    tanggal_home_visit: string;
    pemberian_pmt?: boolean;
    berat_badan_terakhir?: string;
  }

  const [data, setData] = useState<dataTypes>({
    tanggal_home_visit: formatDate(new Date()),
  });
  const [selectingDate, setSelectingDate] = useState(false);

  const validate = (): boolean => {
    const requiredFields = [
      data.nama_anak,
      data.jenis_kelamin,
      data.usia,
      data.nama_ibu,
      data.alamat,
      data.no_hp,
      data.tanggal_home_visit,
      data.pemberian_pmt,
      data.berat_badan_terakhir,
    ];
    if (requiredFields.some(field => field === undefined || field === '')) return false;
    return true;
  };

  const toggleNextButton = async () => {
    // ResultScreen.RESULT.navigate(navigation)
    const isValid = validate();
    if (!isValid) return Alert.alert('Peringatan', 'Mohon lengkapi data terlebih dahulu');
    const request_data = {
      ...data,
      jenis_kelamin: data.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan',
      tanggal_home_visit: data.tanggal_home_visit.split('-').reverse().join('-'),
    }

    showLoading(true);
    try {
      const promise = await axios({
        method: 'post',
        url: PMT_MONITOR_PATH,
        timeout: 15000,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`,
        },
        data: request_data,
      });

      const response = promise.data.data;

      if (promise.data.status && promise.data.status === 'success') {
        Alert.alert('Informasi', 'Data berhasil dikirim', [
          {
            text: 'OK',
          },
        ]);
      } else {
        Alert.alert('Peringatan', 'Data gagal dikirim');
      }
        
    } catch (error) {
      console.log('error', error);
    }
    showLoading(false);
  }

  const toggleRiwayat = async () => {
    try {
      const promise = await axios({
        method: 'get',
        url: PMT_MONITOR_PATH,
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
              label: 'Nama Anak',
              value: item.nama_anak,
            },
            {
              label: 'Jenis Kelamin',
              value: item.jenis_kelamin,
            },
            {
              label: 'Usia',
              value: item.usia+' Bulan',
            },
            {
              label: 'Nama Ibu',
              value: item.nama_ibu,
            },
            {
              label: 'Alamat',
              value: item.alamat,
            },
            {
              label: 'No HP Orang Tua',
              value: item.no_hp,
            },
            {
              label: 'Tanggal Home Visit',
              value: item.tanggal_home_visit.split('-').reverse().join('-'),
            },
            {
              label: 'Pemberian PMT',
              value: item.pemberian_pmt ? 'Ya' : 'Tidak',
            },
            {
              label: 'Berat Badan Terakhir',
              value: item.berat_badan_terakhir+' kg',
            },
          ]
        });
      }
      
      HistoryScreen.LIST_DATA.navigate(navigation, { data: histories, access_type: 'pmt_monitor', title: 'Riwayat Pemberian PMT' });
      
    } catch (error) {
      
    }
  }

  return (
    <AppView withSafeArea withHeader title='Kembali' imageBg={require('~/assets/images/bg-info-kesehatan.png')}
    suffixHeader={
      <TouchableOpacity onPress={toggleRiwayat}>
        <AppText style={{ fontSize: 15, fontWeight: 'bold' }}>Riwayat</AppText>
      </TouchableOpacity>
    }>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.formBox}>
            <AppText style={styles.title} bold>Monitoring Pemberian PMT</AppText>
            <View style={styles.warpForm}>
              <AppText style={styles.label} semiBold>Nama Anak</AppText>
              <InputForm
                onSubmitEditing={() => Keyboard.dismiss()}
                returnKeyType="next"
                style={styles.form}
                placeholder='Nama Anak'
                value={data.nama_anak}
                onChangeText={(text: string) => setData({ ...data, nama_anak: text })}
              />
              <AppText style={styles.label} semiBold>Jenis Kelamin</AppText>
              <AppYesNo
                value={data.jenis_kelamin === undefined ? undefined : data.jenis_kelamin === 'L'} 
                onValueChange={(value) => setData({...data, jenis_kelamin: value ? 'L' : 'P'})} 
                customLabel={{ 
                  yes: 'Laki-laki',
                  no: 'Perempuan',
                  }}
                style={styles.checkbox}/>
              <AppText style={styles.label} semiBold>Usia (Bulan)</AppText>
              <InputForm
                onSubmitEditing={() => refNamaIbu.current?.onFocus()}
                returnKeyType="next"
                style={styles.form}
                placeholder='Usia'
                keyboardType='numeric'
                value={data.usia}
                onChangeText={(text: string) => setData({ ...data, usia: numberOnly(text) })}
              />
              <AppText style={styles.label} semiBold>Nama Ibu</AppText>
              <InputForm
                ref={refNamaIbu}
                onSubmitEditing={() => refAlamat.current?.onFocus()}
                returnKeyType="next"
                style={styles.form}
                placeholder='Nama Ibu'
                value={data.nama_ibu}
                onChangeText={(text: string) => setData({ ...data, nama_ibu: text })}
              />
              <AppText style={styles.label} semiBold>Alamat</AppText>
              <InputForm
                ref={refAlamat}
                onSubmitEditing={() => refNoHp.current?.onFocus()}
                returnKeyType="next"
                style={styles.form}
                placeholder='Alamat'
                value={data.alamat}
                onChangeText={(text: string) => setData({ ...data, alamat: text })}
              />
              <AppText style={styles.label} semiBold>No HP Orang Tua</AppText>
              <InputForm
                ref={refNoHp}
                onSubmitEditing={() => Keyboard.dismiss()}
                returnKeyType="next"
                style={styles.form}
                placeholder='No HP Orang Tua'
                value={data.no_hp}
                keyboardType='number-pad'
                onChangeText={(text: string) => setData({ ...data, no_hp: text === '00' || text === '000' ? '0' : '0'+maxLenght(numberOnly(text), 13) })}
              />
              <AppText style={styles.label} semiBold>Tanggal Home Visit</AppText>
              <Pressable onPress={() => setSelectingDate(true)}>
                <InputForm
                  style={styles.form}
                  placeholder='Tanggal Home Visit'
                  keyboardType='number-pad'
                  value={data.tanggal_home_visit}
                  readonly
                />
              </Pressable>
              <AppText style={styles.label} semiBold>Pemberian PMT</AppText>
              <AppYesNo
                value={data.pemberian_pmt} 
                onValueChange={(value) => setData({...data, pemberian_pmt: value})}
                style={styles.checkbox}/>
              <AppText style={styles.label} semiBold>Berat Badan Terakhir (kg)</AppText>
              <InputForm
                onSubmitEditing={() => toggleNextButton()}
                style={styles.form}
                placeholder='Berat Badan Terakhir (kg)'
                value={data.berat_badan_terakhir}
                keyboardType='number-pad'
                onChangeText={(text: string) => setData({ ...data, berat_badan_terakhir: numberOnly(text, 2)})}
              />
            </View>
            <AppButton style={styles.button} onPress={toggleNextButton}>
              Kirim
            </AppButton>
          </View>
          {
            selectingDate &&
            <DateTimePicker
              value={data.tanggal_home_visit ? (parseDate(data.tanggal_home_visit ?? '')) : new Date()}
              mode='date'
              display='default'
              onChange={(event, selectedDate) => {
                setSelectingDate(false);
                setData({ ...data, tanggal_home_visit: selectedDate ? formatDate(selectedDate) : data.tanggal_home_visit });
              }}
              maximumDate={new Date()}
              minimumDate={new Date(new Date().setMonth(new Date().getMonth() - 1))}
            />
          }
        </View>
      </ScrollView>
    </AppView>
  )
}

const heightScreen = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formBox: {
    width: '100%',
    padding: 20,
    paddingTop: 0,
    flex: 1,
    overflow: 'hidden',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20,
  },
  warpForm: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.1,
    shadowRadius: 5,
    elevation: 10,
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
    elevation: 5,
  },
  footer: {
    bottom: 0,
  },
  logo: {
    width: '100%',
  },
});