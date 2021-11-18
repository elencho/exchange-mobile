import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux';

import TransactionHistory from '../screens/TransactionHistory';
import Exercise from '../screens/Exercise';
// import TestScreen from '../screens/Test';
import BottomTabs from '../components/BottomTabs';
import TransactionFilter from '../screens/TransactionFilter';
import ChooseCurrencyModal from '../components/TransactionFilter/ChooseCurrencyModal';
import { setTabRouteName } from '../redux/transactions/actions';

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
        screenOptions={{ headerShown: false }}
        initialRouteName="Transactions"
        tabBar={({ state, navigation, descriptors }) => (
          <BottomTabs
            routes={state.routes}
            navigation={navigation}
            descriptors={descriptors}
          />
        )}
      >
        <Tab.Screen name="Exchange" component={TransactionFilter} />
        <Tab.Screen name="Trade" component={Exercise} />
        <Tab.Screen name="Wallet" component={ChooseCurrencyModal} />
        <Tab.Screen
          name="Transactions"
          children={() => <TransactionHistory />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
