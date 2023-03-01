 import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Button, StatusBar } from 'react-native';
import { useTranslation } from "react-i18next";
import LanguagePicker from '../components/LanguagePicker';

export default function EntryPage({navigation}) {

  const { t } = useTranslation();

    const [loginDatas, setLoginDatas] = React.useState({
        username: "",
        password: ""
    })
    const [registering, setRegistering] = useState(false)

    const [error, setError] = React.useState("");

    const checkPassword = () => {
        if (loginDatas.password === ' ') {
            navigation.navigate('Home')
        } else {
            setError(t('login.error'))
            setTimeout(()=>{
                setError(null)
            }, 1000)
        }
    }

    const createNewAccount = (e) => {
        setRegistering(!registering)
    }


  return (
    <View style={styles.container} >
        <View style={styles.mainTitle} ><Text style={styles.mainTitleText}>Vertical Flight School</Text></View>
        <LanguagePicker />
        <StatusBar
            animated={true}
            barStyle="dark-content"
            hidden={false} />
        <View style={styles.loginContent} >
        <Text style={styles.loginTitle}>{registering ? t('login.registerTitle') : t('login.loginTitle')}</Text>
        {registering ?  <>
            <TextInput
                style={styles.input}
                onChangeText={(e) => setLoginDatas({ username: e })}
                value={loginDatas.username}
                placeholder={t('login.username')}
                autoFocus={true}
            />
            <TextInput
                style={styles.input}
                onChangeText={(e) => setLoginDatas({ password: e})}
                value={loginDatas.password}
                placeholder={t('login.password')}
                autoFocus={true}
                secureTextEntry={true}
            />            
            <TextInput
                style={styles.input}
                onChangeText={(e) => setLoginDatas({ password: e})}
                value={loginDatas.password}
                placeholder={t('login.password')}
                autoFocus={true}
                secureTextEntry={true}
            />
        </> : <>
        <TextInput
            style={styles.input}
            onChangeText={(e) => setLoginDatas({ username: e })}
            value={loginDatas.username}
            placeholder={t('login.username')}
            autoFocus={true}
        />
        <TextInput
            style={styles.input}
            onChangeText={(e) => setLoginDatas({ password: e})}
            value={loginDatas.password}
            placeholder={t('login.password')}
            autoFocus={true}
            secureTextEntry={true}
        />
        </>}
        <Button 
            onPress={checkPassword} 
            title={registering ? t('login.registerButton') : t('login.loginButton')}
            color="#841584"
            accessibilityLabel="Entry test VFS app">
        </Button>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {registering ? null : <Text>{t('login.accountQuestion')}</Text>}
        <Button onPress={createNewAccount} title={registering ? t('login.backToLoginButton') : t('login.createAccount')}/>
        <Text>{t('login.orLoginWith')}</Text>
        <Button title={t('login.facebook')}/>
        <Button title={t('login.google')}/>
        </View>
    </View>
  );
}

EntryPage.navigationOptions = {
    headerShown: false,
}

const styles = StyleSheet.create({
  container: {
/*     display: "fullscreen", */
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start'
  },
  mainTitle: {
    backgroundColor: "#FFEA00",
    height: 100,
    justifyContent: 'center'
  },
  mainTitleText: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 40
  },
  loginContent: {
    flex: 1,
    padding: 20,
    paddingTop: 100
  },    
  loginTitle: {
      fontSize: 20,
      fontWeight: "bold",
      padding: 10,
      textAlign: "center",
      color: "#841584"
  },
  button: {
      padding: 10,
  },
  input: {
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    borderColor: '#dacae6',
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  error: {
    textAlign: 'center',
    marginTop: 20,
    color: '#ad0040'
}
});


 