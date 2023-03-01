import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar, Button } from 'react-native';
import { useTranslation } from "react-i18next";

import VFSNavigator from './navigation/Navigator';
import LoginPage from './screens/EntryPage';  
import StartScreen from './screens/StartScreen';
import CardPacks from './screens/CardPacks';  
import SwipingCards from './screens/SwipingCards';  
import { init } from './helpers/db'
import "./i18n/i18n.config"; // <-- this line added
import {cardsHU, cardsEN} from './screens/cards'



export default function App() {

  const { t, i18n } = useTranslation();

  init().then(() => {
    console.log("Database set up")
  }).catch(err => {
    console.log(err)
  })

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFEA00',
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 23
            },
            drawerActiveBackgroundColor: '#FFEA00',
        }}
      >
      <Drawer.Screen 
          name="Login" 
          component={LoginPage}
          options={{ 
            drawerItemStyle: { color: '' },
            drawerLabel: () => null,
            title: t('loginTitle'),
            drawerIcon: () => null,
            headerShown: false
          }}
          
        />
        <Drawer.Screen 
          name="Home" 
          component={StartScreen}
          options={{ 
            title: t('startTitle'),
          }}
          
        />
        <Drawer.Screen 
          name="CardPacks" 
          component={CardPacks}
          options={{ title: t('cardPackTitle') }} 
        />
        <Drawer.Screen 
          name="SwipingCards" 
          component={SwipingCards}

          options={{ title: t('swipingCardTitle')}}
        />
        <Drawer.Screen 
          name="Settings" 
          component={LoginPage}
          options={{ title: t('options')}}
        />
        <Drawer.Screen 
          name="Logout" 
          component={LoginPage}
          options={{
          title: t('logout'),
          headerShown: false
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

