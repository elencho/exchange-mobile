import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux';

import TransactionHistory from '../screens/TransactionHistory';
import InstantTrade from '../screens/InstantTrade';
import UserProfile from '../screens/UserProfile';
// import TestScreen from '../screens/Test';
import BottomTabs from '../components/BottomTabs';
import TransactionFilter from '../screens/TransactionFilter';
import {
  chooseCurrency,
  setAbbr,
  setTabRouteName,
} from '../redux/transactions/actions';
import Exercise from '../screens/Exercise';
import Wallet from '../screens/Wallet';
import { fetchUserInfo } from '../redux/profile/actions';

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  const tabRoute = (e) => {
    dispatch(chooseCurrency('Show All Currency'));
    dispatch(setAbbr(null));

    dispatch(
      setTabRouteName(
        e.route.name === 'Transactions' && e.navigation.isFocused()
      )
    );
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
      <Tab.Screen name="Transactions" children={() => <TransactionHistory />} />
    </Tab.Navigator>
  );
}
