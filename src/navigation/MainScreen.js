import React, { useEffect, useState, useCallback } from 'react';
import { AppState } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';

import TransactionHistory from '../screens/TransactionHistory';
import InstantTrade from '../screens/InstantTrade';
import BottomTabs from '../components/BottomTabs';
import {
  fetchCurrencies,
  setTabRouteName,
} from '../redux/transactions/actions';
import { fetchUserInfo } from '../redux/profile/actions';
import Wallet from '../screens/Wallet';
import Exchange from '../screens/Exchange';
import BackgroundTimer from 'react-native-background-timer';

const Tab = createBottomTabNavigator();

export default function MainScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const state = useSelector((state) => state.profile.userInfo);
  const { email } = state;

  const [subscription, setSubscription] = useState();

  const [secondsLeft, setSecondsLeft] = useState(30);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    onBeforeShow();
    return () => {
      onClose();
    };
  }, [email]);

  useEffect(() => {
    if (timerOn) {
      startTimer();
    } else {
      BackgroundTimer.stopBackgroundTimer();
    }
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [timerOn]);

  useEffect(() => {
    if (secondsLeft === 0) stopTimer();
  }, [secondsLeft]);

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft((secs) => {
        if (secs > 0) return secs - 1;
        else return 0;
      });
    }, 1000);
  };

  const stopTimer = async () => {
    getBiometricEnabled(email);
    BackgroundTimer.stopBackgroundTimer();
  };

  const handleAppStateChange = useCallback(
    async (newState) => {
      const isOpen = await AsyncStorage.getItem('isOpen');

      // if (!email) {
      //   console.log("this")
      //   dispatch(fetchUserInfo());
      // }

      if (newState !== 'active') {
        setTimerOn(true);
        secondsLeft && setSecondsLeft(30);
      }
      if (newState === 'active') {
        setTimerOn(false);
      }

      if (newState === 'active' && !isOpen) {
        SecureStore.getItemAsync('accessToken')
          .then((t) => dispatch({ type: 'OTP_SAGA', token: t }))
          .catch((err) => console.log(err));
        return getBiometricEnabled(email);
      }
    },

    [AppState]
  );

  const onBeforeShow = useCallback(async () => {
    setSubscription(AppState.addEventListener('change', handleAppStateChange));
  }, [handleAppStateChange]);

  const onClose = useCallback(async () => {
    subscription?.remove();
  }, [subscription]);

  const getBiometricEnabled = useCallback(
    async (user) => {
      const enabled = await AsyncStorage.getItem('BiometricEnabled');
      if (enabled) {
        let parsedUsers = await JSON.parse(enabled);
        const userIndex = await parsedUsers?.find(
          (u) => u?.user === user && u?.enabled === true
        );
        if (userIndex) {
          navigation.navigate('Resume');
        } else {
          return;
        }
      }
    },
    [AppState.currentState]
  );

  const setTabRoute = (e) => {
    dispatch(setTabRouteName(e.route.name));
  };

  return (
    isFocused && (
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
        initialRouteName="Transactions"
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
    )
  );
}
