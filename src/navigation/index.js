import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainScreen from './MainScreen';
import TransactionHistoryScreen from '../screens/TransactionHistory';
import TransactionFilterScreen from '../screens/TransactionFilter';
// import ExerciseScreen from '../screens/Exercise';

const Navigator = createStackNavigator(
  {
    Main: MainScreen,

    TransactionFilter: TransactionFilterScreen,
  },
  { headerMode: 'none' }
);

export default createAppContainer(Navigator);
