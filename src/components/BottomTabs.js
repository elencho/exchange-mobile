import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Pressable, StyleSheet, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Exchange from '../assets/images/BottomTabs/Exchange.svg';
import Trade from '../assets/images/BottomTabs/Trade.svg';
import Wallet from '../assets/images/BottomTabs/Wallet.svg';
import Transactions from '../assets/images/BottomTabs/Transactions.svg';
import ExchangeActive from '../assets/images/BottomTabs/Exchange_Active.svg';
import TradeActive from '../assets/images/BottomTabs/Trade_Active.svg';
import WalletActive from '../assets/images/BottomTabs/Wallet_Active.svg';
import TransactionsActive from '../assets/images/BottomTabs/Transactions_Active.svg';

import colors from '../constants/colors';
import images from '../constants/images';

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
    FocusIcon: images.Focused,
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
            <LinearGradient
              colors={[colors.SECONDARY_BACKGROUND, colors.PRIMARY_BACKGROUND]}
              style={styles.gradient}
              locations={[0.3, 0.8]}
            >
              {focused ? active[route.name] : inactive[route.name]}
              {focused && (
                <Image source={active.FocusIcon} style={styles.focus} />
              )}
            </LinearGradient>
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
    height: 50,
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
  },
});
