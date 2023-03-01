import React, {useRef, useState, useMemo } from 'react'
import { StyleSheet, View, Platform} from 'react-native';
import {
    FlatList,
    PanGestureHandler,
    State
  } from "react-native-gesture-handler";
  import Animated, {interpolateNode, Extrapolate, add} from 'react-native-reanimated'
  import * as Progress from 'react-native-progress';
  import { useTranslation } from "react-i18next";

  import Header from '../components/Header'
  import { cardSwipe } from '../helpers/cardSwipe';
  import Card from '../components/Card';
  import {theme} from '../theme/theme';
  import {cardsHU} from './cards.js';
  import {cardsEN} from './cards.js'

  const {Clock} = Animated
  const PADDING = theme.padding.xLg;

  let cardsList = cardsHU;

  export default function SwipingCards (props) {
    const [cardHeight, setCardHeight] = useState(0);
    const translationY = useRef(new Animated.Value(0)).current  
    const state = useRef(new Animated.Value(State.UNDETERMINED)).current;
    const velocityY = useRef(new Animated.Value(0)).current 
    const clock = useRef(new Clock()).current ; 
    const activeCardIndex = useRef(new Animated.Value(0)).current  
    const [progress, setProgress] = useState(1/cardsList.length);

    const { i18n } = useTranslation(); //i18n instance

    cardsList = i18n.language == 'hu' ? cardsHU : cardsEN;



    const onGesture = Animated.event([
      {
        nativeEvent: {
          translationY,
          state,
          velocityY,
        },
      },
    ],
    );



    const cardAnimation = useMemo(
      () =>
        cardSwipe(
          translationY,
          state,
          velocityY,
          activeCardIndex,
          cardsList.length - 1,
          clock, 
          cardHeight, 
        ),
      [cardsList, cardHeight],
    );
    
    return (
        <View style={styles.container}>
        <Progress.Bar 
            progress={progress} 
            width={390}
            height={5}
            color="yellow"
            borderRadius={0}
            borderWidth={0}
         />
      <PanGestureHandler
        onGestureEvent={onGesture}
        onHandlerStateChange={onGesture}>
        <Animated.View
          style={styles.contentContainer}
          onLayout={({nativeEvent: {layout}}) => setCardHeight(layout.height)}>
          <FlatList
            contentContainerStyle={styles.contentContainer}
            removeClippedSubviews={false}
            data={cardsList}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({item: card, index}) => {
              const position = index * -cardHeight;
              const nextPosition = (index + 1) * -cardHeight;
              const prevPosition = (index - 1) * -cardHeight;
              const firstItemSwipeDownTranslationBlock = index === 0 ? 50 : prevPosition;

              const translateY = interpolateNode(cardAnimation, {
                inputRange: [nextPosition, position, prevPosition],
                outputRange: [
                  position,
                  position,
                  firstItemSwipeDownTranslationBlock,
                ],
              });

              const scale = interpolateNode(cardAnimation, {
                inputRange: [nextPosition, position, prevPosition],
                outputRange: [0.8, 1, 1],
                extrapolate: Extrapolate.CLAMP,
              });

              return (
                <Animated.View
                  style={StyleSheet.flatten([
                    styles.cardWrapper,
                    {
                      height: cardHeight,
                    },
                    {
                      transform: [
                      {translateY: add(-position, translateY)},
                      {scale},
                      ],
                    },
                  ])}
                  key={card.id}>
                  <Card {...card} cards={cardsList} index={index}/>   

                </Animated.View>
      );
    }}

          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

SwipingCards.navigationOptions = (navigationData) => {
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
    backgroundColor: 'black',
  },
  contentContainer: {
    flex: 1,
  },
  cardWrapper: {
    padding: PADDING,
    width: '100%',
    position: 'absolute', // <- added
    top: 0, // <- added
    left: 0, // <- added
  },
});
