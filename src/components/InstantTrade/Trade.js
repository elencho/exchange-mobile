import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { toggleTransactionDetails } from '../../redux/modals/actions';

export default function Trade() {
  const dispatch = useDispatch();

  const show = () => {
    dispatch(toggleTransactionDetails(true));
  };

  return (
    <Pressable style={styles.container} onPress={show}>
      <View style={styles.row}>
        <AppText style={styles.primary} medium body>
          LTC - GEL
        </AppText>
        <AppText style={styles.secondary} subtext>
          200.00 GEL{' '}
          <AppText subtext style={styles.primary}>
            / 0.000008 LTC
          </AppText>
        </AppText>
      </View>

      <View style={styles.row}>
        <AppText style={styles.primary} body>
          Buy{' '}
          <AppText subtext style={styles.secondary}>
            / Instant Trade
          </AppText>
        </AppText>
        <AppText subtext style={styles.secondary}>
          Price: 0.00008060 LTC
        </AppText>
      </View>

      <View style={[styles.row, styles.marginTop]}>
        <AppText subtext style={styles.secondary}>
          20 Apr, 2021 / 12:00:00
        </AppText>
        <AppText subtext style={styles.secondary}>
          Expired
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#232945',
  },
  primary: {
    color: colors.PRIMARY_TEXT,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  marginTop: {
    marginTop: 8,
    marginBottom: 13,
  },
});