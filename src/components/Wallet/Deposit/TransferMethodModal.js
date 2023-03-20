import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../../AppModal';
import AppText from '../../AppText';

import colors from '../../../constants/colors';
import { ICONS_URL_PNG } from '../../../constants/api';
import { toggleTransferMethodModal } from '../../../redux/modals/actions';
import { setNetwork } from '../../../redux/wallet/actions';

export default function TransferMethodModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const {
    modals: { transferMethodModalVisible },
    transactions: { code },
    wallet: { network, methodsToDisplay, walletTab },
    trade: {
      balance: { balances },
    },
  } = state;

  useEffect(() => {
    let methodsToDisplay = [];
    const m =
      walletTab === 'Withdrawal' ? 'withdrawalMethods' : 'depositMethods';
    balances.forEach((b) => {
      if (code === b.currencyCode) {
        if (b[m]?.ECOMMERCE)
          methodsToDisplay.push({
            displayName: 'Payment Card',
            provider: 'ECOMMERCE',
          });
        if (b[m]?.WIRE) {
          b[m]?.WIRE.reduceRight((_, m) => methodsToDisplay.push(m), 0);
        }
        if (b[m]?.WALLET) {
          b[m]?.WALLET.forEach((m) => methodsToDisplay.push(m));
        }
        dispatch({ type: 'SET_METHODS_TO_DISPLAY', methodsToDisplay });
      }
    });

    return () =>
      dispatch({ type: 'SET_METHODS_TO_DISPLAY', methodsToDisplay: [] });
  }, [code]);

  const hide = () => dispatch(toggleTransferMethodModal(false));

  const handlePress = (m) => {
    dispatch(setNetwork(m));
    dispatch({ type: 'REFRESH_WALLET_AND_TRADES' });
    // Card Needs to be checked
    hide();
  };

  const background = (m) => {
    if (m === network) {
      return { backgroundColor: 'rgba(101, 130, 253, 0.1)' };
    }
  };

  const source = (network) =>
    network === 'ECOMMERCE'
      ? { uri: `${ICONS_URL_PNG}/visa-or-mc.png` }
      : { uri: `${ICONS_URL_PNG}/${network}.png` };

  const children = (
    <>
      {methodsToDisplay.map((m) => (
        <Pressable
          style={[styles.pressable, background(m.provider)]}
          key={m.displayName}
          onPress={() => handlePress(m.provider)}
        >
          <Image source={source(m.provider)} style={styles.image} />
          <AppText body style={styles.primary}>
            {m.displayName}
          </AppText>
        </Pressable>
      ))}
    </>
  );

  return (
    <AppModal
      children={children}
      hide={hide}
      bottom
      visible={transferMethodModalVisible}
      title="Payment Method"
    />
  );
}

const styles = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    height: 44,
    paddingHorizontal: 15,
    marginVertical: 2,
    marginHorizontal: -15,
    alignItems: 'center',
    borderRadius: 5,
  },
  primary: {
    color: colors.PRIMARY_TEXT,
    marginLeft: 20,
  },
  image: {
    width: 60,
    height: 12,
  },
});
