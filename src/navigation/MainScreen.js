import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import TransactionHistory from '../screens/TransactionHistory';
import InstantTrade from '../screens/InstantTrade';
// import TestScreen from '../screens/Test';
import BottomTabs from '../components/BottomTabs';
import {
  chooseCurrency,
  setAbbr,
  setTabRouteName,
  showResultsAction,
} from '../redux/transactions/actions';
import Exercise from '../screens/Exercise';
import Wallet from '../screens/Wallet';
import { fetchUserInfo, setLanguage } from '../redux/profile/actions';
import { switchLanguage } from '../utils/i18n';

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserInfo());

    SecureStore.getItemAsync('Language')
      .then((l) => {
        switchLanguage(l);
        dispatch(setLanguage(l));
      })
      .catch((err) => console.log(err));
  }, []);

  const tabRoute = (e) => {
    if (e.route.name === 'Transactions') {
      dispatch(setTabRouteName(e.navigation.isFocused()));
    }
  };

  return (
    <Tab.Navigator
      screenListeners={tabRoute}
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
      }}
      initialRouteName="Wallet"
      tabBar={({ state, navigation, descriptors }) => (
        <BottomTabs
          routes={state.routes}
          navigation={navigation}
          descriptors={descriptors}
        />
      )}
    >
      <Tab.Screen name="Exchange" component={Exercise} />
      <Tab.Screen name="Trade" component={InstantTrade} />
      <Tab.Screen name="Wallet" component={Wallet} />
      <Tab.Screen name="Transactions" component={TransactionHistory} />
    </Tab.Navigator>
  );
}
