import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Pressable, StyleSheet, View } from 'react-native';

import Exchange from '../assets/images/BottomTabs/Exchange.svg';
import Trade from '../assets/images/BottomTabs/Trade.svg';
import Wallet from '../assets/images/BottomTabs/Wallet.svg';
import Transactions from '../assets/images/BottomTabs/Transactions.svg';
import ExchangeActive from '../assets/images/BottomTabs/Exchange_Active.svg';
import TradeActive from '../assets/images/BottomTabs/Trade_Active.svg';
import WalletActive from '../assets/images/BottomTabs/Wallet_Active.svg';
import TransactionsActive from '../assets/images/BottomTabs/Transactions_Active.svg';
import FocusIcon from '../assets/images/Focused';

export default function BottomTabs({ navigation, descriptors, routes }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'SET_TAB_NAVIGATION_REF',
      tabNavigationRef: navigation,
    });
  }, []);

  const active = {
    Wallet: <WalletActive />,
    Transactions: <TransactionsActive />,
    Exchange: <ExchangeActive />,
    Trade: <TradeActive />,
  };

  const inactive = {
    Wallet: <Wallet />,
    Transactions: <Transactions />,
    Exchange: <Exchange />,
    Trade: <Trade />,
  };

  return (
    <View style={styles.container}>
      {routes.map((route) => {
        const focused = descriptors[route.key].navigation.isFocused();
        const navigate = () => navigation.navigate(route.name);

        return (
          <Pressable key={route.key} style={styles.tab} onPress={navigate}>
            <View style={styles.gradient}>
              {focused ? active[route.name] : inactive[route.name]}
              {focused && <FocusIcon style={styles.focus} />}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 60,
  },
  focus: {
    width: 5,
    height: 5,
    position: 'absolute',
    bottom: 5,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
  },
});
