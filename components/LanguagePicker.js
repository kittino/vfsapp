//LanguagePicker.tsx

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

const STORE_LANGUAGE_KEY = "settings.lang";

const LanguagePicker = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { i18n } = useTranslation(); //i18n instance

  const [defaultLabel, setdefaultLabel] = useState(false);
  AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language) => {
    if (language) {
      setdefaultLabel(language);
    } 
  })
  //array with all supported languages
  const languages = [
    { name: "hu", label: "Magyar" },
    { name: "en", label: "English" },
    { name: "DE", label: "Deutsch" }
  ];

  const LanguageItem = ({ name, label }) => {
    return (
    <Pressable
      style={styles.button}
      onPress={() => {
        i18n.changeLanguage(name);
        setModalVisible(!modalVisible);
      }}
    >
      <Text style={styles.textStyle}>{label}</Text>
    </Pressable>
    )};

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {languages.map((lang) => (
              <LanguageItem {...lang} key={lang.name} />
            ))}
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>{i18n.language ? i18n.language : defaultLabel}</Text>
      </Pressable>
    </View>
  );
};

export default LanguagePicker;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 80,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 5,
    elevation: 2,
    alignSelf: 'flex-end',
    margin: 5,
    height: 35,
    width: 66
  },
  buttonOpen: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1
  },
  textStyle: {
    color: '#1a1a1a',
    fontSize: 15
  }
});