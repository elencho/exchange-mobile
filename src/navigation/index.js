import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/Welcome';
import LoginScreen from '../screens/Login';
import MainScreen from './MainScreen';
import TransactionFilter from '../screens/TransactionFilter';
import UserProfileScreen from '../screens/UserProfile';
import BalanceScreen from '../screens/Wallet/Balance';
// import ExerciseScreen from '../screens/Exercise';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainScreen} />

        <Stack.Screen name="TransactionFilter" component={TransactionFilter} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="Balance" component={BalanceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
