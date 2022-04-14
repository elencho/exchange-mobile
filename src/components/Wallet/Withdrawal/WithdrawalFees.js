import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../../../constants/colors';
import AppText from '../../AppText';
import PurpleText from '../../PurpleText';

export default function WithdrawalFees() {
  return (
    <View style={styles.block}>
      <AppText subtext style={styles.subtext}>
        Fee 3%, Total amount 0 USD / Does not include bank fees
      </AppText>

      <View style={styles.view}>
        <AppText subtext style={styles.subtext}>
          USD 0 - 100 Fee 3 %{' '}
        </AppText>
        <View style={styles.row}>
          <AppText subtext style={styles.subtext}>
            USD 100 - 200 Fee 4 % - 2.2 USD{'  '}
          </AppText>
          <PurpleText subtext text="See More" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginTop: 8,
    paddingHorizontal: 15,
  },
  row: { flexDirection: 'row' },
  subtext: { color: colors.SECONDARY_TEXT },
  view: {
    height: 32,
    marginTop: 19,
    justifyContent: 'space-between',
  },
});
