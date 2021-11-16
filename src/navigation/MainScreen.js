import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TransactionHistory from '../screens/TransactionHistory';
import Exercise from '../screens/Exercise';
// import TestScreen from '../screens/Test';
import BottomTabs from '../components/BottomTabs';
import TransactionFilter from '../screens/TransactionFilter';
import ChooseCurrencyModal from '../components/TransactionFilter/ChooseCurrencyModal';

const Tab = createBottomTabNavigator();

export default function MainScreen({ navigation }) {
  return (
    <NavigationContainer>
      <Tab.Navigator
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
          children={() => <TransactionHistory navigation={navigation} />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
