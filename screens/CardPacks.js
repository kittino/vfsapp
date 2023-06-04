import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Platform, Pressable, Modal as NativeModal } from 'react-native';
import { useTranslation } from "react-i18next";
import MainButton from '../components/MainButton.js'
import PackButton from '../components/PackButtons.js';

import Modal from 'modal-enhanced-react-native-web';


// test pull request


export default function CardPacks({navigation}) {
    const [modalVisible, setModalVisible] = useState(null);
    const [item, setItem] = useState({});
    const { t } = useTranslation();

    const packs = [
        {id: 1, name: t('cardPacksScreen.basic'), available: true, description: t('cardPacksScreen.modalInfo') },
        {id: 2, name: t('cardPacksScreen.basic2'), available: false, description: t('cardPacksScreen.modalInfo')},
        {id: 3, name: t('cardPacksScreen.basic3'), available: false, description: t('cardPacksScreen.modalInfo')}
    ]
    const openModalHandler = (item) => {
        setModalVisible(true)
        setItem(item)
    }

    const renderModalContent = () => (
        <View style={styles.modalContent}>
            <Text style={styles.modalText}>{item.available ? t('cardPacksScreen.packAvailable') : t('cardPacksScreen.packNotAvailable') }</Text>
            <Text style={styles.modalText}>{item.description}</Text>
            {item.available ? <View style={styles.modalButtons}>
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('SwipingCards')
                        setModalVisible(false)
                    }}
                >
                    <Text  style={styles.textStyle}>{t('cardPacksScreen.modalButtonFull')}</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={styles.textStyle}>{t('cardPacksScreen.modalButtonRandom')}</Text>
                </Pressable>
            </View> : 
            <View >
                <Pressable
                style={styles.button}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={styles.textStyle}>{t('cardPacksScreen.buyPackButton')}</Text>
                </Pressable>
            </View>
            }
        </View>
      ); 

  return (
    <View style={styles.container}>
        {packs.map(pack => {
            return <PackButton key={pack.id} available={pack.available} onPress={() => openModalHandler(pack)} name={pack.name} />
        })}

        {Platform.OS === 'ios' || Platform.OS === 'android' ?
        <NativeModal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {setModalVisible(!modalVisible)}}
        >
            {renderModalContent()}
        </NativeModal>
        :
        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(null)}
        >
            {renderModalContent()}
        </Modal>}
        
    </View>
  );
}

CardPacks.navigationOptions = (navigationData) => {

    return {
        headerTitle: label.main,
        headerBackTitle: label.back,
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? 'white' : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'black' : '#262626'
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
   centeredView: {
    marginTop: '70%'
  },
  modalContent: {
    margin: 20,
    marginTop: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

    modalButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
  button: {
    marginRight: 10,
    borderRadius: 20,
    padding: 10,
    width: '100%',
    elevation: 2,
    margin: 10,
    justifyContent: 'center',
    backgroundColor: '#00a0ff',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
