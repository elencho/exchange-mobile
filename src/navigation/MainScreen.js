import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux';

import TransactionHistory from '../screens/TransactionHistory';
import InstantTrade from '../screens/InstantTrade';
// import TestScreen from '../screens/Test';
import BottomTabs from '../components/BottomTabs';
import TransactionFilter from '../screens/TransactionFilter';
import { setTabRouteName } from '../redux/transactions/actions';
import Exercise from '../screens/Exercise';

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  const dispatch = useDispatch();

  const tabRoute = (e) => {
    dispatch(
      setTabRouteName(
        e.route.name === 'Transactions' && e.navigation.isFocused()
      )
    );
  };

  return (
    <NavigationContainer>
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
        <Tab.Screen name="Exchange" component={TransactionFilter} />
        <Tab.Screen name="Trade" component={InstantTrade} />
        <Tab.Screen name="Wallet" component={Exercise} />
        <Tab.Screen
          name="Transactions"
          children={() => <TransactionHistory />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
