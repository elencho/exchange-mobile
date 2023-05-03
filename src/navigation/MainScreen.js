import React, { useEffect, useState, useCallback } from 'react';
import { AppState } from 'react-native';

import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

export default function MainScreen({ navigation }) {
  const dispatch = useDispatch();

  const [subscription, setSubscription] = useState();

  useEffect(() => {
    onBeforeShow();
    return () => {
      onClose();
    };
  }, []);

  const handleAppStateChange = useCallback(async (newState) => {
    const isOpen = await AsyncStorage.getItem('isOpen');

    if (newState === 'active' && !isOpen) {
      SecureStore.getItemAsync('accessToken')
        .then((t) => dispatch({ type: 'OTP_SAGA', token: t }))
        .catch((err) => console.log(err));
      dispatch(fetchCurrencies());
      return getBiometricEnabled();
    } else if (newState !== 'active' && isOpen) {
      await AsyncStorage.removeItem('isOpen');
    }
  }, []);

  const onBeforeShow = useCallback(() => {
    setSubscription(AppState.addEventListener('change', handleAppStateChange));
  }, [handleAppStateChange]);

  const onClose = useCallback(async () => {
    subscription?.remove();
  }, [subscription]);

  const getBiometricEnabled = useCallback(async () => {
    const enabled = await AsyncStorage.getItem('BiometricEnabled');
    if (enabled) {
      navigation.navigate('Resume');
    }
  }, [AppState.currentState]);

  const setTabRoute = (e) => {
    dispatch(setTabRouteName(e.route.name));
  };

  return (
    <Tab.Navigator
      screenListeners={setTabRoute}
      tabBarPosition="bottom"
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
        animationEnabled: true,
        lazy: true,
        freezeOnBlur: true,
        swipeEnabled: false,
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
