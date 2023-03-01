/* 
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform, Button, Image, FlatList, ImageBackground } from 'react-native';
import CardFlip from 'react-native-card-flip';
import * as Progress from 'react-native-progress';
import Header from '../components/Header';
 
const cardsHU = [
]
const cardsEN = [
    {id: 1, front: require("../assets/cardsEN/01.jpg"), back: require("../assets/cardsEN/01b.jpg")},
    {id: 2, front: require("../assets/cardsEN/02.jpg"), back: require("../assets/cardsEN/02b.jpg")},
    {id: 3, front: require("../assets/cardsEN/03.jpg"), back: require("../assets/cardsEN/03b.jpg")},
    {id: 4, front: require("../assets/cardsEN/04.jpg"), back: require("../assets/cardsEN/04b.jpg")},
  ]
  const cardsDE = [
    {id: 1, front: require("../assets/cardsDE/01.jpg"), back: require("../assets/cardsDE/01b.jpg")},
    {id: 2, front: require("../assets/cardsDE/02.jpg"), back: require("../assets/cardsDE/02b.jpg")},
    {id: 3, front: require("../assets/cardsDE/03.jpg"), back: require("../assets/cardsDE/03b.jpg")},
    {id: 4, front: require("../assets/cardsDE/04.jpg"), back: require("../assets/cardsDE/04b.jpg")},
  ]

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

export default function CardQAndAScreen(props) {
  let cards = cardsHU
  const [clickedCard, setClickedCard] = useState(0);
  const [nextMemo , setNextMemo] = useState(false);
  const [progress, setProgress] = useState(1/cards.length);
  const lng = props.navigation.getParam('language')
  

  useEffect(() => {
    setNextMemo(false)
  }, [])
  const switchCardPlus = () => {
    if (clickedCard + 1 < cards.length) {
      setClickedCard(prevCount => prevCount + 1)
      setProgress(progress + 1/cards.length)
      setNextMemo(true)
    }
  };
  const switchCardMinus = () => {
    if (clickedCard - 1 >= 0) {
      setClickedCard(prevCount => prevCount - 1)
      setProgress(progress - 1/cards.length)
    }
    setNextMemo(true)
  };

  let label = {prev: '', next: ''};
  if (lng === 'HU') {
      label.prev = 'Előző';
      label.next = 'Következő';
      cards = cardsHU;
  } else if (lng === 'EN') {
      label.prev = 'Previous';
      label.next = 'Next';
      cards = cardsEN;
  } else {
      label.prev = 'Bisherige';
      label.next = 'Folgendes';
      cards = cardsDE;
  }


  return (
    <View style={styles.container}>
        <Progress.Bar 
            progress={progress} 
            width={390}
            height={5}
            color="orange"
            borderRadius={0}
            borderWidth={0}
         />

          {cards.map((item, index) => {
          if (clickedCard === index ) {
            return (
            <CardFlip flipZoom={0.02} perspective={1000} duration={800} key={index} style={ styles.cardContainer } ref={ (card) => cards['card' + index] = card } >
              <TouchableOpacity activeOpacity={2.2} style={ styles.card } onPress={() => cards['card' + index].flip()} >
                <Image style={styles.image} resizeMode={'stretch'} source={item.front} /> 
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={2.2} style={ styles.card } onPress={() => cards['card' + index].flip()} >
                 <Image style={styles.image}  resizeMode={'stretch'} source={item.back} /> 
              </TouchableOpacity>
            </CardFlip>
          )
          }
        })}  



    </View> 
  );
}


CardQAndAScreen.navigationOptions = (navigationData) => {
    const lng = navigationData.navigation.getParam('language')
    let label = {main: '', back: ''};
    if (lng === 'HU') {
        label.main = 'Kvíz',
        label.back = 'Vissza'
    } else if (lng === 'EN') {
        label.main = 'Quiz'
        label.back = 'Back'
    } else {
        label.main = 'Quiz'
        label.back = 'Zurück'
    }
    return {
        headerTitle: props => <Header {...props} label={label.main} lng={lng} />,
        headerBackTitle: label.back,
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? 'black' : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : '#262626'
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    height: '100%',
    backgroundColor: '#a6a6a6'
  },
  card: {
    width: '100%',
    height: '100%',
  },

  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',

},



container: {
  flex: 1,
},
item: {
  backgroundColor: '#f9c2ff',

  padding: 140,
  marginVertical: 8,
  marginHorizontal: 2,
},
title: {
  fontSize: 32,
},



});




 //// 2.

/* import React, { useState } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native'
import CardFlip from 'react-native-card-flip';
import * as Progress from 'react-native-progress';

import Header from '../components/Header';

const cardsHU = [
  {id: 1, front: require("../assets/cards/01.jpg"), back: require("../assets/cards/01h.jpg")},
  {id: 2, front: require("../assets/cards/02.jpg"), back: require("../assets/cards/02h.jpg")},
  {id: 3, front: require("../assets/cards/03.jpg"), back: require("../assets/cards/03h.jpg")},
  {id: 4, front: require("../assets/cards/04.jpg"), back: require("../assets/cards/04h.jpg")},
]
export default function CardQAndAScreen () {

  const [cards, setCards] = useState(cardsHU)
  const [swipedAllCards, setSwipedAllCards] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState('')
  const [cardIndex, setCardIndex] = useState(0)
  const [progress, setProgress] = useState();
  const [prevIndex, setPrevIndex] = useState(0)

  let swiper_this;

  const renderCard = (card, index) => {
    return (
      <CardFlip flipZoom={0.02} perspective={1000} duration={800} key={index} style={ styles.card } ref={ (card) => cards['card' + index] = card } >
        <TouchableOpacity activeOpacity={2.2} style={ styles.card } onPress={() => cards['card' + index].flip()} >
          <Image style={styles.image} resizeMode={'stretch'} source={card.front} /> 
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={2.2} style={ styles.card } onPress={() => cards['card' + index].flip()} >
         <Image style={styles.image}  resizeMode={'stretch'} source={card.back} /> 
        </TouchableOpacity>
      </CardFlip>
    )
  };

  const onSwiped = (type, i) => {
    setPrevIndex(i)
    if (i === cards.length - 1) {
      swiper_this.swipeBack()
    }
    if (type === 'right') {
      swiper_this.swipeBack()
    }
  }
  const onSwipedAllCards = () => {
    setSwipedAllCards(true) 
  };

  const swipeLeft = (swiper) => {

  };


    return (
      <View style={styles.container}>
        <Progress.Bar 
            progress={progress} 
            width={390}
            height={5}
            color="orange"
            borderRadius={0}
            borderWidth={0}
            style={styles.progressBar}
         />
        <Swiper
          ref={swiper => {
            swiper_this = swiper
          }}
          onSwiped={(i) => onSwiped('general', i)}
          onSwipedLeft={() => onSwiped('left')}
          onSwipedRight={() => onSwiped('right')}
          onTapCard={swipeLeft}
          cards={cards}
          cardIndex={cardIndex}
          cardVerticalMargin={40}
          renderCard={renderCard}
          onSwipedAll={onSwipedAllCards}
          stackSize={cards.length}
          stackSeparation={15}
          showSecondCard={false}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
          swipeAnimationDuration={200}
        >

        </Swiper>
      </View>
    )
}

CardQAndAScreen.navigationOptions = (navigationData) => {
  const lng = navigationData.navigation.getParam('language')
  let label = {main: '', back: ''};
  if (lng === 'HU') {
      label.main = 'Kvíz',
      label.back = 'Vissza'
  } else if (lng === 'EN') {
      label.main = 'Quiz'
      label.back = 'Back'
  } else {
      label.main = 'Quiz'
      label.back = 'Zurück'
  }
  return {
      headerTitle: props => <Header {...props} label={label.main} lng={lng} />,
      headerBackTitle: label.back,
      headerStyle: {
          backgroundColor: Platform.OS === 'android' ? 'black' : ''
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : '#262626'
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    overflow: 'hidden'
  },
  card: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    marginBottom: 30
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
},
progressBar: {
  backgroundColor: "orange"
}
}) */

