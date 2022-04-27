import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../../constants/colors';
import images from '../../../constants/images';
import { toggleTransferMethodModal } from '../../../redux/modals/actions';
import { setNetwork } from '../../../redux/wallet/actions';
import AppModal from '../../AppModal';
import AppText from '../../AppText';

export default function TransferMethodModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [methods, setMethods] = useState([]);

  const {
    modals: { transferMethodModalVisible },
    transactions: { code },
    wallet: { network, hasMultipleMethods },
    trade: {
      balance: { balances },
    },
  } = state;

  let methodsToDisplay = [];

  useEffect(() => {
    balances.forEach((b) => {
      if (hasMultipleMethods && code === b.currencyCode) {
        if (b.depositMethods.ECOMMERCE)
          methodsToDisplay.push({
            displayName: 'Payment Card',
            provider: 'ECOMMERCE',
          });
        if (b.depositMethods.WIRE) {
          b.depositMethods.WIRE.reduceRight(
            (_, m) => methodsToDisplay.push(m),
            0
          );
        }
        if (b.depositMethods.WALLET) {
          b.depositMethods.WALLET.forEach((m) => methodsToDisplay.push(m));
        }
        setMethods(methodsToDisplay);
      }
    });

    return () => setMethods([]);
  }, [code]);

  const hide = () => dispatch(toggleTransferMethodModal(false));

  const handlePress = (m) => {
    dispatch(setNetwork(m));
    // Card Needs to be checked
    hide();
  };

  const background = (m) => {
    if (m === network) {
      return { backgroundColor: 'rgba(101, 130, 253, 0.1)' };
    }
  };

  const children = (
    <>
      {methods.map((m) => (
        <Pressable
          style={[styles.pressable, background(m.provider)]}
          key={m.displayName}
          onPress={() => handlePress(m.provider)}
        >
          <Image source={images.Swift} />
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
});
