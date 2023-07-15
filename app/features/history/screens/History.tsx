import { CompositeNavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import AppButton from '~/app/core/component/AppButton';
import AppText from '~/app/core/component/AppText';
import AppView from '~/app/core/component/AppView';
import ResultScreen from '../../result/config/Screens';

export default function History({ navigation }: { navigation: CompositeNavigationProp<any, any> }) {

  type dataTypes = {
    name: string,
    date: string,
  }

  const [data, setData] = useState<dataTypes[]>([
    {
      name: 'Joko Widodo',
      date: '12/12/2020',
    }
  ]);


  const toggleNextButton = (): void => {
  }

  return (
    <AppView withSafeArea>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.formBox}>
            <AppText style={styles.title} bold>Riwayat</AppText>
            {
              data.map((item, index) => (
                <Pressable key={index} style={styles.warpForm} onPress={() => ResultScreen.RESULT.navigate(navigation)}>
                  <AppText style={styles.label}>Nama</AppText>
                  <AppText style={styles.value} bold>{item.name}</AppText>
                  <AppText style={styles.label}>Tanggal</AppText>
                  <AppText style={styles.value} bold>{item.date}</AppText>
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
  },
  formBox: {
    width: '100%',
    padding: 20,
    flex: 1,
    overflow: 'hidden',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 15,
  },
  warpForm: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.1,
    shadowRadius: 5,
    elevation: 10,
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
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#29B6F6',
  }
});