import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../../constants/colors';
import images from '../../../constants/images';
import { monthsShort } from '../../../constants/months';
import { toggleGenerateRequestModal } from '../../../redux/modals/actions';
import { generateCryptoAddressAction } from '../../../redux/wallet/actions';
import AppText from '../../AppText';
import PurpleText from '../../PurpleText';
import Headline from '../../TransactionHistory/Headline';

export default function FlexBlock({ reason, restrictedUntil, type }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    transactions: { code },
    trade: { currentBalanceObj },
    wallet: { network },
  } = state;

  const text = () => {
    if (reason === 'no address') {
      return 'Reason: No Addresses';
    } else if (reason === 'OTP_RESET') {
      return `${type} Reason: OTP_RESET`;
    } else if (reason === 'SUPPORT') {
      return `${type} Reason: Support`;
    } else if (reason === 'METHOD') {
      return `Doesn't have ${type} method`;
    } else {
      return null;
    }
  };

  const image = () => {
    if (reason === 'no address') {
      return images.Address_List;
    } else {
      return images.Warning_White;
    }
  };

  const headline = () => {
    if (reason === 'no address') {
      return 'Deposit Address';
    } else {
      return 'Unavailable';
    }
  };

  const addAddress = () => {
    if (network === 'ERC20' || network === 'BEP20') {
      dispatch(toggleGenerateRequestModal(true));
    } else if (currentBalanceObj.depositMethods.WALLET) {
      const provider = currentBalanceObj.depositMethods.WALLET[0].provider;
      dispatch(generateCryptoAddressAction(code, provider));
    }
  };

  const date = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate()} ${
      monthsShort[date.getMonth()]
    }, ${date.getFullYear()} / ${date.toLocaleTimeString()}`;
  };

  return (
    <View style={styles.flexBlock}>
      <Image source={image()} />
      <Headline title={headline()} />
      <AppText body style={styles.description}>
        {text()}
      </AppText>
      {reason === 'no address' && (
        <PurpleText text="+ Add Address" onPress={addAddress} />
      )}
      {restrictedUntil && (
        <AppText body style={styles.description}>
          Reinstate date:{'  '}
          <AppText style={{ color: 'white' }}>{date(restrictedUntil)}</AppText>
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    color: colors.SECONDARY_TEXT,
    textAlign: 'center',
    // marginHorizontal: '20%',
    lineHeight: 20,
    marginBottom: 40,
  },
  flexBlock: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingHorizontal: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
});
