import React from 'react';
import { Pressable, StyleSheet, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import colors from '../constants/colors';

export default function BottomTabs({ navigation, descriptors, routes }) {
  const active = {
    Wallet: require('../assets/images/Wallet_Active.png'),
    Transactions: require('../assets/images/Transactions_Active.png'),
    Exchange: require('../assets/images/Exchange_Active.png'),
    Trade: require('../assets/images/Trade_Active.png'),
    FocusIcon: require('../assets/images/Focused.png'),
  };

  const inactive = {
    Wallet: require('../assets/images/Wallet.png'),
    Transactions: require('../assets/images/Transactions.png'),
    Exchange: require('../assets/images/Exchange.png'),
    Trade: require('../assets/images/Trade.png'),
  };

  return (
    <View style={styles.container}>
      {routes.map((route) => {
        const focused = descriptors[route.key].navigation.isFocused();
        const navigate = () => {
          navigation.navigate(route.name);
        };
        return (
          <Pressable key={route.key} style={styles.tab} onPress={navigate}>
            <LinearGradient
              colors={[colors.SECONDARY_BACKGROUND, colors.PRIMARY_BACKGROUND]}
              style={styles.gradient}
              locations={[0.5, 0.6]}
            >
              <Image
                source={focused ? active[route.name] : inactive[route.name]}
                style={styles.icon}
              />
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
  icon: {
    width: 18,
    height: 18,
  },
  tab: {
    flex: 1,
  },
});
