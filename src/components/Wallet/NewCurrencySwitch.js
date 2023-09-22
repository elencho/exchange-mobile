import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { setUsdBtcSwitch } from '../../redux/wallet/actions';
import Next from '../../assets/images/Next.svg';

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
        <Next />
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
    borderColor: '#38427E',
    borderWidth: 1,
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    color: colors.SECONDARY_PURPLE,
    paddingRight: 2,
  },
});
