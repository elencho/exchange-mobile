import React from 'react';
import { Image, Pressable, StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../../AppText';
import colors from '../../../constants/colors';
import { COINS_URL_PNG } from '../../../constants/api';
import { toggleCurrencyModal } from '../../../redux/modals/actions';

import Arrow from '../../../assets/images/Arrow';
import AppDropdown from '../../AppDropdown';

export default function WalletCoinsDropdown() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    transactions: { code },
    wallet: { usdBtcSwitch },
    trade: {
      currentBalanceObj: { available, total, valueUSD, valueBTC },
    },
  } = state;

  const handleDropdown = () => dispatch(toggleCurrencyModal(true));

  const value = usdBtcSwitch === 'USD' ? valueUSD : valueBTC;

  return (
    <>
      <AppDropdown
        handlePress={handleDropdown}
        icon={
          <Image
            source={{ uri: `${COINS_URL_PNG}/${code?.toLowerCase()}.png` }}
            style={styles.image}
          />
        }
        selectedText={`${available} ${code}`}
        notClearable
      />

      <Text style={styles.secondary}>
        <AppText subtext>Total :</AppText>
        <AppText subtext>{` ${total} ≈ ${value} ${usdBtcSwitch}`}</AppText>
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  arrow: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  balance: {
    justifyContent: 'space-between',
    marginLeft: 12,
    marginRight: 18,
    flex: 1,
  },
  container: {
    borderWidth: 1,
    borderColor: '#3C4167',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
  },
  line: {
    width: 1,
    height: '100%',
    backgroundColor: '#3B4160',
  },
  primary: {
    color: colors.PRIMARY_TEXT,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    marginTop: 8,
  },
});
