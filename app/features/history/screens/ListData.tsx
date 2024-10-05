import { CompositeNavigationProp } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import AppText from '~/app/core/component/AppText';
import AppView from '~/app/core/component/AppView';

type Props = {
  route: any,
}

export default function ListData({ route }: { navigation: CompositeNavigationProp<any, any> } & Props) {

  const { data, title } = route.params;

  return (
    <AppView withSafeArea withHeader title="Kembali">
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.formBox}>
            <AppText style={styles.title} bold>
              {title ?? "Riwayat"}
            </AppText>
            {data.map(
              (
                item: {
                  id: string;
                  data: [
                    {
                      label: string;
                      value: string;
                    }
                  ];
                },
                index: number
              ) => (
                <Pressable key={index} style={styles.warpForm}>
                  {item.data.map(
                    (
                      item: {
                        label: string;
                        value: string;
                      },
                      idx: number
                    ) => (
                      <View key={idx}>
                        <AppText style={styles.label}>{item.label}</AppText>
                        <AppText style={styles.value} bold>
                          {item.value}
                        </AppText>
                      </View>
                    )
                  )}
                </Pressable>
              )
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