import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import AppText from '../../AppText';
import colors from '../../../constants/colors';

export default function WireTransferWarning() {
  const walletTab = useSelector((state) => state.wallet.walletTab);

  return (
    <View style={styles.warning}>
      <AppText subtext style={styles.subtext}>
        Wire Transfers {walletTab}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  subtext: {
    color: colors.SECONDARY_TEXT,
    marginLeft: 10,
  },
  warning: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(242, 223, 180, 0.04)',
    padding: 15,
  },
});
