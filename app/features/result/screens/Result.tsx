import {
  CompositeNavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  BackHandler,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import AppButton from "~/app/core/component/AppButton";
import AppText from "~/app/core/component/AppText";
import AppView from "~/app/core/component/AppView";
import HomeScreen from "../../home/config/Screens";
import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "react-native";

type RouteProps = {
  route: any;
};

export default function Result({ route }: RouteProps) {
  const { data } = route.params;
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        toggleNextButton();
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );

  const toggleNextButton = (): void => {
    const previousScreen =
      navigation.getState().routes[navigation.getState().routes.length - 2]
        .name;
    if (previousScreen === "History/History") return navigation.goBack();
    return HomeScreen.HOME.navigate(navigation);
  };

  const showInformation = (type: string): void => {
    const information = data.statuses.find((item: any) => item.type === type);

    Alert.alert(
      "Informasi Kesehatan",
      `Status ${processString(type)} anda ${information.name}. ${
        information.description
      }.`
    );
  };

  function processString(input: string) {
    if (input.length === 3) {
      return input.toUpperCase();
    } else {
      return input.replace(/_/g, " ");
    }
  }

  return (
    <AppView withSafeArea>
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={require("~/assets/images/logo-new.png")}
            style={styles.logo}
          />
          <View style={styles.formBox}>
            <AppText style={styles.title} bold>
              Hasil
            </AppText>
            <AppText
              style={[styles.label, { marginBottom: 20, textAlign: "center" }]}
            >
              {`Berikut status gizi anda saat ini.`}
            </AppText>
            <View style={styles.warpForm}>
              <AppText style={styles.label}>Nama</AppText>
              <AppText style={styles.value} bold>
                {data.name}
              </AppText>
              <AppText style={styles.label}>Tanggal</AppText>
              <AppText style={styles.value} bold>
                {data.date}
              </AppText>
              <AppText style={styles.label}>IMT</AppText>
              <AppText style={styles.value} bold>
                {data.imt}
                {` `}
                {data.imt.includes("Normal") ? null : (
                  <FontAwesome5
                    name="question-circle"
                    size={12}
                    style={styles.questionIcon}
                    onPress={() =>
                      navigation.navigate("Intervensi/Detail", {
                        key: "imt",
                      })
                    }
                  />
                )}
              </AppText>
              <AppText style={styles.label}>Tekanan Darah</AppText>
              <AppText style={styles.value} bold>
                {data.tekanan_darah}
                {` `}
                {data.tekanan_darah.includes("Normal") ? null : (
                  <FontAwesome5
                    name="question-circle"
                    size={15}
                    style={styles.questionIcon}
                    onPress={() =>
                      navigation.navigate("Intervensi/Detail", {
                        key: "tekanan_darah",
                      })
                    }
                  />
                )}
              </AppText>
              <AppText style={styles.label}>Gula Darah</AppText>
              <AppText style={styles.value} bold>
                {data.gula_darah}
                {` `}
                {data.gula_darah.includes("Normal") ? null : (
                  <FontAwesome5
                    name="question-circle"
                    size={12}
                    style={styles.questionIcon}
                    onPress={() =>
                      navigation.navigate("Intervensi/Detail", {
                        key: "gula",
                      })
                    }
                  />
                )}
              </AppText>
              <AppText style={styles.label}>HB</AppText>
              <AppText style={styles.value} bold>
                {data.hb}
                {` `}
                {data.hb.includes("Normal") ? null : (
                  <FontAwesome5
                    name="question-circle"
                    size={12}
                    style={styles.questionIcon}
                    onPress={() =>
                      navigation.navigate("Intervensi/Detail", {
                        key: "hb",
                      })
                    }
                  />
                )}
              </AppText>
              <AppText style={styles.label}>Kolesterol</AppText>
              <AppText style={styles.value} bold>
                {data.kolesterol}
                {` `}
                {data.kolesterol.includes("Normal") ? null : (
                  <FontAwesome5
                    name="question-circle"
                    size={12}
                    style={styles.questionIcon}
                    onPress={() =>
                      navigation.navigate("Intervensi/Detail", {
                        key: "kolesterol",
                      })
                    }
                  />
                )}
              </AppText>
              <AppText style={styles.label}>Asam Urat</AppText>
              <AppText style={styles.value} bold>
                {data.asam_urat}
                {` `}
                {data.asam_urat.includes("Normal") ? null : (
                  <FontAwesome5
                    name="question-circle"
                    size={12}
                    style={styles.questionIcon}
                    onPress={() =>
                      navigation.navigate("Intervensi/Detail", {
                        key: "asam_urat",
                      })
                    }
                  />
                )}
              </AppText>
            </View>
            <AppButton
              style={styles.button}
              textStyle={styles.buttonText}
              onPress={toggleNextButton}
            >
              OK
            </AppButton>
          </View>
        </View>
      </ScrollView>
    </AppView>
  );
}

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
    marginTop: 10,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
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
    marginTop: 20,
    elevation: 5,
    marginBottom: 30,
  },
  buttonText: {
    // color: "#29B6F6",
  },
  questionIcon: {
    color: "#29B6F6",
  },
});
