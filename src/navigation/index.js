import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainScreen from './MainScreen';
import TransactionHistoryScreen from '../screens/TransactionHistory';
import TransactionFilterScreen from '../screens/TransactionFilter';
import UserProfileScreen from '../screens/UserProfile';
// import ExerciseScreen from '../screens/Exercise';

const Navigator = createStackNavigator(
  {
    Main: MainScreen,

    TransactionFilter: TransactionFilterScreen,
    UserProfile: UserProfileScreen,
  },
  { headerMode: 'none' }
);

export default createAppContainer(Navigator);
