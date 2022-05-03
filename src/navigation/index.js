import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import WelcomeScreen from '../screens/Welcome';
import LoginScreen from '../screens/Login';
import MainScreen from './MainScreen';
import TransactionFilterScreen from '../screens/TransactionFilter';
import UserProfileScreen from '../screens/UserProfile';
import BalanceScreen from '../screens/Wallet/Balance';
// import ExerciseScreen from '../screens/Exercise';

const Navigator = createStackNavigator(
  {
    Main: MainScreen,
    Welcome: WelcomeScreen,
    Login: LoginScreen,

    TransactionFilter: TransactionFilterScreen,
    UserProfile: UserProfileScreen,
    Balance: BalanceScreen,
  },
  {
    headerMode: 'none',
  }
);

export default createAppContainer(Navigator);
