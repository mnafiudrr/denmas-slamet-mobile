import { CompositeNavigationProp } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import AppText from '~/app/core/component/AppText';
import AppView from '~/app/core/component/AppView';
import { showLoading } from '~/app/core/utils/loader';
import axios from 'axios';
import { PROFILE_PATH } from '~/app/service/ApiServices';
import { AuthContext } from '~/app/core/config/AuthContext';
import { formatDate, maskingDateFormat, parseDate } from '~/app/core/utils/formatter';
import InputForm from '~/app/core/component/InputForm';
import AppButton from '~/app/core/component/AppButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Alert } from 'react-native';

export default function Profile({ navigation }: { navigation: CompositeNavigationProp<any, any> }) {

  type dataTypes = {
    fullname: string,
    address: string,
    birthplace: string,
    birthday: string,
    riwayat_kesehatan_dahulu: string,
    riwayat_kesehatan_keluarga: string,
  }

  const [data, setData] = useState<dataTypes>({
    fullname: '',
    address: '', 
    birthplace: '', 
    birthday: '',
    riwayat_kesehatan_dahulu: '',
    riwayat_kesehatan_keluarga: '',
  });
  const [selectingDate, setSelectingDate] = useState(false);
  const { userData, setUserData } = useContext(AuthContext);

  useEffect(() => {
    getUsers();
  },[]);

  const getUsers = async() => {
    showLoading(true);
    try {
      const promise = await axios({
        method: 'get',
        url: `${PROFILE_PATH}/${userData.profile_id}`,
        timeout: 15000,
        headers: {
          Authorization: `Bearer ${userData.token}`,
          Accept: 'application/json',
        },
      });
      
      const response = promise.data.data;

      setData({
        fullname: response.fullname,
        address: response.address,
        birthplace: response.birthplace,
        birthday: formatDate(response.birthday),
        riwayat_kesehatan_dahulu: response.riwayat_kesehatan_dahulu,
        riwayat_kesehatan_keluarga: response.riwayat_kesehatan_keluarga,
      });
      
    } catch (error) {
      
    }
    showLoading(false);
  }

  const validate = () => {
    if (data.fullname == '') {
      alert('Nama tidak boleh kosong');
      return false;
    }
    if (data.address == '') {
      alert('Alamat tidak boleh kosong');
      return false;
    }
    if (data.birthplace == '') {
      alert('Tempat Lahir tidak boleh kosong');
      return false;
    }
    if (data.birthday == '') {
      alert('Tanggal Lahir tidak boleh kosong');
      return false;
    }

    if (data.birthday.length < 10) {
      alert('Format Tanggal Lahir salah');
      return false;
    }

    const date = new Date(data.birthday);
    if (date.toString() == 'Invalid Date') {
      alert('Format Tanggal Lahir salah');
      return false;
    }

    return true;
  }

  const save = async() => {
    if (!validate()) return;
    
    showLoading(true);
    try {
      const promise = await axios({
        method: 'put',
        url: `${PROFILE_PATH}/${userData.profile_id}`,
        timeout: 15000,
        headers: {
          Authorization: `Bearer ${userData.token}`,
          Accept: 'application/json',
        },
        data
      });

      setUserData({...userData, fullname: data.fullname});
      
      Alert.alert(
        'Berhasil',
        'Data berhasil disimpan',
      );
    } catch (error) {
      Alert.alert(
        'Gagal',
        'Data gagal disimpan',
      );
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
            <AppText style={styles.title} bold>
              {`PROFILE`}
            </AppText>
            <View style={styles.warpForm}>
              <AppText style={styles.label}>Nama</AppText>
              <InputForm
                style={styles.form}
                placeholder="Nama"
                value={data.fullname}
                onChangeText={(text: string) =>
                  setData({ ...data, fullname: text })
                }
              />
              <AppText style={styles.label}>Alamat</AppText>
              <InputForm
                style={styles.form}
                placeholder="Alamat"
                value={data.address}
                onChangeText={(text: string) =>
                  setData({ ...data, address: text })
                }
              />
              <AppText style={styles.label}>Tempat Lahir</AppText>
              <InputForm
                style={styles.form}
                placeholder="Tempat Lahir"
                value={data.birthplace}
                onChangeText={(text: string) =>
                  setData({ ...data, birthplace: text })
                }
              />
              <AppText style={styles.label}>Tanggal Lahir</AppText>
              <Pressable onPress={() => setSelectingDate(true)}>
                <InputForm
                  style={styles.form}
                  placeholder="Tanggal Lahir"
                  keyboardType="number-pad"
                  value={data.birthday}
                  readonly
                />
              </Pressable>
              <AppText style={styles.label}>Riwayat Kesehatan Dahulu</AppText>
              <InputForm
                style={styles.form}
                placeholder="Riwayat kesehatan dahulu"
                value={data.riwayat_kesehatan_dahulu}
                onChangeText={(text: string) =>
                  setData({ ...data, riwayat_kesehatan_dahulu: text })
                }
              />
              <AppText style={styles.label}>Riwayat Kesehatan Keluarga</AppText>
              <InputForm
                style={styles.form}
                placeholder="Riwayat kesehatan keluarga"
                value={data.riwayat_kesehatan_keluarga}
                onChangeText={(text: string) =>
                  setData({ ...data, riwayat_kesehatan_keluarga: text })
                }
              />
              {selectingDate && (
                <DateTimePicker
                  value={parseDate(data.birthday)}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setSelectingDate(false);
                    setData({
                      ...data,
                      birthday: selectedDate
                        ? formatDate(selectedDate)
                        : data.birthday,
                    });
                  }}
                  // maximum date 5 years ago, and minimum date 70 years ago
                  maximumDate={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() - 5)
                    )
                  }
                  minimumDate={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() - 70)
                    )
                  }
                />
              )}
            </View>
            <AppButton style={styles.button} onPress={save}>
              Simpan
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
    alignItems: "center",
    marginTop: 140,
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 40,
    marginBottom: 40,
  },
  logo: {
    width: 180,
    height: 180,
    marginTop: -120,
  },
  formBox: {
    width: "100%",
    padding: 20,
    paddingTop: 0,
    flex: 1,
    overflow: "hidden",
  },
  title: {
    fontSize: 25,
    marginLeft: 10,
  },
  warpForm: {
    marginBottom: 20,
    padding: 10,
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
    elevation: 5,
  },
  buttonText: {
    color: "#29B6F6",
  },
  form: {
    marginBottom: 10,
  },
});