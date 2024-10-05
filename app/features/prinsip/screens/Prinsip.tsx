import { CompositeNavigationProp } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import AppButtonCustom from "~/app/core/component/AppButtonCustom";
import AppText from "~/app/core/component/AppText";
import AppView from "~/app/core/component/AppView";
import HtmlContent from "~/app/core/component/HtmlContent";
import { AuthContext } from "~/app/core/config/AuthContext";
import { showLoading } from "~/app/core/utils/loader";
import { GET_PRINSIP_3J } from "~/app/service/ApiServices";

export default function Prinsip({
  navigation,
}: {
  navigation: CompositeNavigationProp<any, any>;
}) {
  const { userData } = useContext(AuthContext);

  const [content, setcontent] = useState('')

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    showLoading(true);
    try {
      const promise = await axios({
        method: "get",
        url: GET_PRINSIP_3J,
        timeout: 15000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      });
      setcontent(promise.data.content);
    } catch (error) {
      console.log(error);
    }
    showLoading(false);
  };

  return (
    <AppView withSafeArea withHeader title="Kembali">
      <ScrollView>
        <View style={styles.container}>
          <AppButtonCustom
            style={styles.button}
            styleContent={styles.buttonContent}
          >
            <View style={styles.buttonLeftArea}>
              <AppText bold style={styles.title}>
                Prinsip 3J
              </AppText>
            </View>
            <Image
              source={require("~/assets/images/food.png")}
              style={styles.buttonRightArea}
            />
          </AppButtonCustom>
          <View style={styles.formBox}>
            <HtmlContent html={content} />
          </View>
        </View>
      </ScrollView>
    </AppView>
  );
}

const heightScreen = Dimensions.get("screen").height;
const styles = StyleSheet.create({
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
  button: {
    width: "90%",
    maxWidth: 450,
    elevation: 10,
    height: 130,
    marginTop: -60,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  buttonLeftArea: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  buttonRightArea: {
    width: 130,
    height: 130,
    marginRight: -30,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 15,
    color: "white",
  },
});
