import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TransactionHistory from './TransactionHistory';
// import Exercise from './Exercise';
import TestScreen from './Test';
import BottomTabs from '../components/BottomTabs';
import TransactionFilter from './TransactionFilter';
import ChooseCurrencyModal from '../components/TransactionFilter/ChooseCurrencyModal';

const Tab = createBottomTabNavigator();

export default function MainScreen({ navigation }) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Exchange"
        tabBar={({ state, navigation, descriptors }) => (
          <BottomTabs
            routes={state.routes}
            navigation={navigation}
            descriptors={descriptors}
          />
        )}
      >
        <Tab.Screen name="Exchange" component={TransactionFilter} />
        <Tab.Screen name="Trade" component={TestScreen} />
        <Tab.Screen name="Wallet" component={ChooseCurrencyModal} />
        <Tab.Screen
          name="Transactions"
          children={() => <TransactionHistory navigation={navigation} />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
