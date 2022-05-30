import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux';

import TransactionHistory from '../screens/TransactionHistory';
import InstantTrade from '../screens/InstantTrade';
// import TestScreen from '../screens/Test';
import BottomTabs from '../components/BottomTabs';
import { setTabRouteName } from '../redux/transactions/actions';
import Exercise from '../screens/Exercise';
import Wallet from '../screens/Wallet';
import { fetchUserInfo } from '../redux/profile/actions';

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  const setTabRoute = (e) => dispatch(setTabRouteName(e.route.name));

  return (
    <Tab.Navigator
      screenListeners={setTabRoute}
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
