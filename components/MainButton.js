import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const MainButton = props => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000000',
    paddingVertical: 26,
    paddingHorizontal: 40,
    width: '100%',
  },
  buttonText: {
    color: '#fff7e0',
    fontSize: 18,
    textAlign: 'center',
    width: '100%'
  }
});

export default MainButton;
