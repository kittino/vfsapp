import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, ImageBackground } from 'react-native';
import { useTranslation } from "react-i18next";

import MainButton from '../components/MainButton.js'
import logo from "../assets/logo.png"


export default function StartScreen({navigation}) {

    const [lng, setLng] = useState('HU')
    const [imageurl, setImageUrl] = useState()
    const { t , i18n } = useTranslation();

    const changeLngHandler = (lng) => {
        setLng(lng)
    }

  return (
    <View style={styles.container}>
        <ImageBackground source={logo} style={styles.image}>
        </ImageBackground>
        <View >
   
            <View style={styles.startPageButtons} >
                <MainButton 
                  lng={lng}
                  onPress={() => navigation.navigate('CardPacks')}
//                    onPress={() => {
//                    props.navigation.navigate({
//                        routeName: 'CardPacks',
//                        params: {
//                            language: lng
//                        }
//                    })
//                }}
                >
                    {t('startScreen')}
                </MainButton>
            </View>
            <View style={styles.languageButtons}>
              <TouchableOpacity
                onPress={() => i18n.changeLanguage('hu')}
                style={styles.lngBtn}
              >
                <Text>Magyar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => i18n.changeLanguage('en')}
                style={styles.lngBtn}
              >
                <Text>English</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => i18n.changeLanguage('de')}
                style={styles.lngBtn}
              >
                <Text>Deutsche</Text>
              </TouchableOpacity>
            </View>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  img: {
    width: '100%',
    height: undefined,
    aspectRatio: 0.71,

  },
  languageButtons: {
      flexDirection: 'row',
      justifyContent: 'center',
  },
  startPageButtons: {
      width: '100%'
  },
  lngBtn: {
    margin: 10,
    padding: 10,
  },
  image: {
    flex: 0.95,
    resizeMode: "cover",
    justifyContent: "center"
  },
});
