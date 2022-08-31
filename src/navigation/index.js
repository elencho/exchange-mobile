import React from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';

import WelcomeScreen from '../screens/Welcome';
import LoginScreen from '../screens/Login';
import RegistrationScreen from '../screens/Registration';
import MainScreen from './MainScreen';
import TransactionFilter from '../screens/TransactionFilter';
import UserProfileScreen from '../screens/UserProfile';
import BalanceScreen from '../screens/Wallet/Balance';
import Login2FaScreen from '../screens/Login2Fa';
import ResetOtpInstructionsScreen from '../screens/ResetOtpInstructions';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import SetNewPasswordScreen from '../screens/SetNewPassword';

import { saveGeneralError } from '../redux/profile/actions';
// import ExerciseScreen from '../screens/Exercise';

const Stack = createNativeStackNavigator();
export const navigationRef = createNavigationContainerRef();

export default function Navigator() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    profile: { generalError },
  } = state;

  BackHandler.addEventListener('hardwareBackPress', () => true);

  const onStateChange = () => {
    if (generalError) dispatch(saveGeneralError(null));
  };

  return (
    <NavigationContainer onStateChange={onStateChange} ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          headerLeft: () => null,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Main" component={MainScreen} />

        <Stack.Screen name="TransactionFilter" component={TransactionFilter} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="Balance" component={BalanceScreen} />

        <Stack.Screen name="Login2Fa" component={Login2FaScreen} />
        <Stack.Screen
          name="ResetOtpInstructions"
          component={ResetOtpInstructionsScreen}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="SetNewPassword" component={SetNewPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
