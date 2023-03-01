import React from 'react';
import {Image, StyleSheet, View, Text, ImageSourcePropType, TouchableOpacity} from 'react-native';
import {theme} from '../theme/theme';
import CardFlip from 'react-native-card-flip';

const Card = ({front, back, cards, index}) => {

  return (
    <View style={styles.container}>
      <CardFlip ref={card => cards['card' + index] = card}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.card}
          onPress={() => cards['card' + index].flip()}>
          <Image style={styles.image} source={front} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.card}
          onPress={() => cards['card' + index].flip()}>
          <Image style={styles.image} source={back} />
        </TouchableOpacity>
      </CardFlip>
{/*         <Image style={styles.image} source={{uri}} />
      <View style={styles.cardContent}>
        <Image source={logo} resizeMode="contain" style={styles.logo} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>   */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.black100,
    flex: 1,
    borderRadius: theme.padding.xLg,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    opacity: 0.85,
    borderRadius: theme.padding.xLg,
    backgroundColor: '#fff208',
    width: '100%',
    height: undefined,
    resizeMode: 'cover',
  },

  card: {
    width: '100%',
    height: 640,
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },

});

export default Card;
