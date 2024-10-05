import { CompositeNavigationProp } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import AppText from "~/app/core/component/AppText";
import AppView from "~/app/core/component/AppView";
import { AuthContext } from "~/app/core/config/AuthContext";
import { showLoading } from "~/app/core/utils/loader";
import { GET_FAQ } from "~/app/service/ApiServices";
import { Ionicons } from "@expo/vector-icons"; 

export default function Faq({
  navigation,
}: {
  navigation: CompositeNavigationProp<any, any>;
}) {
  const { userData } = useContext(AuthContext);

  type FaqType = {
    question: string;
    answer: string;
    showAnswer: boolean;
  };
  
  const [faqs, setFaqs] = useState([] as FaqType[]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    showLoading(true);
    try {
      const promise = await axios({
        method: "get",
        url: GET_FAQ,
        timeout: 15000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      });
      let data = promise.data;
      for (let i = 0; i < data.length; i++) {
        data[i].showAnswer = false;
      }
      setFaqs(data);
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
              Pertanyaan yang sering ditanyakan
            </AppText>
            {faqs.map((item, index) => (
              <View key={index} style={styles.faqBox}>
                <Pressable
                  style={[
                    styles.question,
                    item.showAnswer ? styles.active : styles.questionInactive,
                  ]}
                  onPress={() => {
                    setFaqs(
                      faqs.map((faq, index2) =>
                        index2 === index
                          ? { ...faq, showAnswer: !faqs[index].showAnswer }
                          : { ...faq, showAnswer: false }
                      )
                    );
                  }}
                >
                  <AppText style={styles.questionText}>{item.question}</AppText>
                  <Ionicons
                    name={item.showAnswer ? "chevron-up" : "chevron-down"}
                    size={24}
                    color={item.showAnswer ? "#29B6F6" : "black"}
                    style={styles.icon}
                  />
                </Pressable>
                {item.showAnswer && (
                  <AppText style={[styles.answer, styles.active]}>{item.answer}</AppText>
                )}
              </View>
            ))}
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
    fontSize: 20,
    textAlign: "center",
    marginBottom: 15,
  },
  faqBox: {
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  active: {
    backgroundColor: "#f3f3f3",
    padding: 10,
  },
  question: {
    fontSize: 15,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  questionInactive: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#ffffff",
  },
  questionText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  icon: {
    width: 20,
    height: 20,
  },
  answer: {
    fontSize: 13,
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
