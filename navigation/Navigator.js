import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
//S
import StartScreen from '../screens/StartScreen';
import CardQAndAScreen from '../screens/CardQAndAScreen'; 
import CardPacks from '../screens/CardPacks';  
import EntryPage from '../screens/EntryPage';  
import SwipingCards from '../screens/SwipingCards';  





const VFSNavigator = createStackNavigator({
/*     EntryPage: EntryPage, */
    Start: StartScreen,
    CardPacks: CardPacks, 
/*     Cards: CardQAndAScreen,  */
    Cards: SwipingCards

})

export default createAppContainer(VFSNavigator);