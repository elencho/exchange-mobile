import React, { useEffect, useState, useCallback } from 'react';
import { AppState } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import jwt_decode from 'jwt-decode';

import TransactionHistory from '../screens/TransactionHistory';
import InstantTrade from '../screens/InstantTrade';
import BottomTabs from '../components/BottomTabs';
import { setTabRouteName } from '../redux/transactions/actions';
import Wallet from '../screens/Wallet';
import Exchange from '../screens/Exchange';

const Tab = createBottomTabNavigator();

export default function MainScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const state = useSelector((state) => state.profile.userInfo);
  // const { email } = state;

  const [subscription, setSubscription] = useState();

  // const [secondsLeft, setSecondsLeft] = useState(30);
  // const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    onBeforeShow();
    return () => {
      onClose();
    };
  }, []);

  //TODO:Remove
  // useEffect(() => {
  //   if (timerOn) {
  //     startTimer();
  //   }
  //   if (!timerOn) {
  //     BackgroundTimer.stopBackgroundTimer();
  //   }
  //   return () => {
  //     BackgroundTimer.stopBackgroundTimer();
  //   };
  // }, [timerOn]);

  // useEffect(() => {
  //   if (secondsLeft === 0) stopTimer();
  // }, [secondsLeft]);

  // const startTimer = () => {
  //   if (timerOn) {
  //     BackgroundTimer.runBackgroundTimer(() => {
  //       setSecondsLeft((secs) => {
  //         if (secs > 0) return secs - 1;
  //         else return 0;
  //       });
  //     }, 1000);
  //   }
  // };

  // const stopTimer = async () => {
  //   getBiometricEnabled(email);
  //   BackgroundTimer.stopBackgroundTimer();
  // };

  const handleAppStateChange = useCallback(
    async (newState) => {
      //TODO:Remove
      const isOpen = await AsyncStorage.getItem('isOpen');
      const lastTimeOpen = await AsyncStorage.getItem('isOpenDate');
      const timeDifference = Date.now() - JSON.parse(lastTimeOpen);

      if (newState !== 'active') {
        const date = JSON.stringify(Date.now());
        await AsyncStorage.setItem('isOpenDate', date);
        // setTimerOn(true);
        // secondsLeft && setSecondsLeft(30);
      }
      //TODO:Remove
      // if (newState === 'active') {
      //   setTimerOn(false);
      // }
      // if (newState === 'active' && !timerOn) {
      //   return;
      // }
      if (newState === 'active' && timeDifference >= 30000) {
        SecureStore.getItemAsync('accessToken')
          .then((t) => {
            if (t) {
              const email = jwt_decode(t)?.email;
              dispatch({ type: 'OTP_SAGA', token: t });
              getBiometricEnabled(email);
            }
          })
          .catch((err) => console.log(err));
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
    )
  );
}
