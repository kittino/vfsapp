import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';

import TitleText from './TitleText';

const Header = props => {

  let label;
  if (props.lng === 'HU') {
    label = 'Alap'
  } else if (props.lng === 'EN') {
    label = 'Basic'
  } else {
    label = 'Basis'
  }
  return (
    <View style={styles.header}>
      <TitleText style={styles.text}>{props.label}</TitleText>
      <Pressable >
        <Text style={styles.packSelector}>{label}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Platform.OS === 'android' ? 'white' : 'black',
    marginRight: Platform.OS === 'android' ? 40 : 0,
  },
  packSelector: {
    color: Platform.OS === 'android' ? 'white' : 'black',
    marginRight: Platform.OS === 'android' ? 40 : 0,
  }

});

export default Header;
