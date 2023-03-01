import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';


const PackButton = props => {
    
  return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress} style={styles.container}  >
                <ImageBackground style={styles.image} source=""  >
                    <Text style={styles.text}>{props.name}</Text>
                </ImageBackground> 
        </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '85%',
    height: 140,
    borderRadius: 20,
    marginTop: 20,  
    backgroundColor: 'black',
    justifyContent: 'center',
    backgroundColor: '#ffd500',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
  },
  image: {
    height: '100%',
    resizeMode: "contain",
    justifyContent: "center",
    borderRadius: 100
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  },

});

export default PackButton;
