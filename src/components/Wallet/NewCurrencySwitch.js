import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { setUsdBtcSwitch } from '../../redux/wallet/actions';

export default function NewCurrencySwitch() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.wallet.usdBtcSwitch);

  const setFilter = (f) => {
    dispatch(setUsdBtcSwitch(f));
  };

  const onPress = () => {
    if (filter === 'USD') {
      setFilter('BTC');
    } else {
      setFilter('USD');
    }
  };

  return (
    <View style={styles.row}>
      <Pressable onPress={onPress} style={styles.filter}>
        <AppText style={styles.filterText} body>
          {filter}
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  filter: {
    width: 55,
    height: 25,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.SECONDARY_PURPLE,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
  },
  filterText: {
    color: colors.SECONDARY_PURPLE,
  },
});
