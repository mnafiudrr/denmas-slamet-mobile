import { CompositeNavigationProp } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import AppText from "~/app/core/component/AppText";
import AppView from "~/app/core/component/AppView";
import HtmlContent from "~/app/core/component/HtmlContent";
import { AuthContext } from "~/app/core/config/AuthContext";
import { showLoading } from "~/app/core/utils/loader";
import { GET_INTERVENSI } from "~/app/service/ApiServices";

type Props = {
  navigation: CompositeNavigationProp<any, any>;
  route: any;
};

export default function DetailIntervensi({
  navigation,
  route,
}: Props) {
  const { userData } = useContext(AuthContext);
  const { key } = route.params;

  const [content, setcontent] = useState("");
  const [title, setTitle] = useState("Detail Intervensi")

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    showLoading(true);
    try {
      const promise = await axios({
        method: "get",
        url: `${GET_INTERVENSI}/${key}`,
        timeout: 15000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      });
      setTitle(promise.data.title);
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
          <View style={styles.formBox}>
            <AppText style={styles.title} bold>
              {title}
            </AppText>
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
  },
  formBox: {
    width: "100%",
    paddingHorizontal: 20,
    flex: 1,
    overflow: "hidden",
  },
  title: {
    fontSize: 21,
    textAlign: "center",
    marginBottom: 15,
  },
});
