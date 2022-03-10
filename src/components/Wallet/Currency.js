import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import images from '../../constants/images';
import { chooseCurrency, setAbbr } from '../../redux/transactions/actions';
import AppText from '../AppText';

function Currency({
  navigation,
  code,
  name,
  total,
  available,
  valueUSD,
  valueBTC,
}) {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.wallet.usdBtcSwitch);

  const handlePress = () => {
    navigation.navigate('Balance');
    dispatch(chooseCurrency(name));
    dispatch(setAbbr(code));
  };

  const usdBitcoin = () => {
    if (filter === 'USD') {
      return valueUSD;
    }
    if (filter === 'BTC') {
      return valueBTC;
    }
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Image source={images.ETH} style={styles.image} />

      <View style={styles.balance}>
        <AppText calendarDay medium style={styles.primary}>
          {available} {code}
        </AppText>
        <AppText body style={styles.secondary}>
          Total: {total} = {usdBitcoin()} {filter}
        </AppText>
      </View>
    </Pressable>
  );
}

export default withNavigation(Currency);

const styles = StyleSheet.create({
  balance: {
    justifyContent: 'space-between',
    marginLeft: 20,
  },
  container: {
    flexDirection: 'row',
    height: 42,
    marginBottom: 25,
  },
  image: {
    width: 42,
    height: 42,
  },
  primary: {
    color: colors.PRIMARY_TEXT,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
});
