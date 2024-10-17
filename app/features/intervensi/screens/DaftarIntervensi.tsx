import { CompositeNavigationProp } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, ImageBackground, Pressable, ScrollView, StyleSheet, View } from "react-native";
import AppText from "~/app/core/component/AppText";
import AppView from "~/app/core/component/AppView";
import { AuthContext } from "~/app/core/config/AuthContext";
import { showLoading } from "~/app/core/utils/loader";
import { GET_INTERVENSI, GET_PRINSIP_3J } from "~/app/service/ApiServices";
import { Ionicons } from "@expo/vector-icons";

export default function DaftarIntervensi({
  navigation,
}: {
  navigation: CompositeNavigationProp<any, any>;
}) {
  const { userData } = useContext(AuthContext);

  type IntervensiType = {
    key: string;
    title: string;
    content: string;
  };
  const [interventions, setInterventions] = useState([] as IntervensiType[]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    showLoading(true);
    try {
      const promise = await axios({
        method: "get",
        url: GET_INTERVENSI,
        timeout: 15000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      });

      setInterventions(promise.data);
    } catch (error) {
      console.log(error);
    }
    showLoading(false);
  };

  return (
    <AppView
      withSafeArea
      withHeader
      title="Kembali"
      imageBg={require("~/assets/images/white.png")}
      styleHeaderText={{ color: "black" }}
      barStyle="dark-content"
    >
      <ScrollView>
        <ImageBackground 
        style={styles.container} 
        imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        source={require("~/assets/images/bg-main.png")}>
          <View style={styles.formBox}>
            <AppText style={styles.title} bold>
              Daftar Intervensi
            </AppText>
            {interventions.map((intervensi, index) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                  padding: 10,
                  borderRadius: 10,
                  marginBottom: 10,
                  shadowColor: "#000",
                  shadowOffset: { width: 1, height: 1 },
                  shadowOpacity: 0.4,
                  shadowRadius: 5,
                  elevation: 4,
                }}
                key={index}
              >
                <View
                  style={{
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <AppText style={{ fontSize: 14, flex: 1 }}>
                    {intervensi.title}
                  </AppText>
                </View>
                <Pressable
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.5 : 1,
                    },
                  ]}
                  onPress={() =>
                    navigation.navigate("Intervensi/Detail", {
                      key: intervensi.key,
                    })
                  }
                >
                  <Ionicons name="arrow-forward" size={24} color="#29B6F6" />
                </Pressable>
              </View>
            ))}
          </View>
        </ImageBackground>
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
    minHeight: heightScreen - 45,
  },
  formBox: {
    width: "100%",
    paddingHorizontal: 20,
    flex: 1,
    overflow: "hidden",
    marginTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 15,
    color: "white"
  },
});
