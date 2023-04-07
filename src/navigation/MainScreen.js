import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import TransactionHistory from '../screens/TransactionHistory';
import InstantTrade from '../screens/InstantTrade';
import BottomTabs from '../components/BottomTabs';
import {
  fetchCurrencies,
  setTabRouteName,
} from '../redux/transactions/actions';
import Wallet from '../screens/Wallet';
import Exchange from '../screens/Exchange';

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    SecureStore.getItemAsync('accessToken')
      .then((t) => dispatch({ type: 'OTP_SAGA', token: t }))
      .catch((err) => console.log(err));

    dispatch(fetchCurrencies());
  }, []);

  const setTabRoute = (e) => {
    dispatch(setTabRouteName(e.route.name));
  };

  return (
    <Tab.Navigator
      screenListeners={setTabRoute}
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
      }}
      initialRouteName="Trade"
      tabBar={({ state, navigation, descriptors }) => (
        <BottomTabs
          routes={state.routes}
          navigation={navigation}
          descriptors={descriptors}
        />
      )}
    >
      <Tab.Screen name="Trade" component={InstantTrade} />
      <Tab.Screen name="Wallet" component={Wallet} />
      <Tab.Screen name="Transactions" component={TransactionHistory} />
      <Tab.Screen name="Exchange" component={Exchange} />
    </Tab.Navigator>
  );
}
