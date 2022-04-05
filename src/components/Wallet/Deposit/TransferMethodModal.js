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

  let methodsToDisplay = [];

  useEffect(() => {
    balances.forEach((b) => {
      if (code === b.currencyCode) {
        const array = Object.keys(b.depositMethods);
        for (let i = 0; i < array.length; i++) {
          methodsToDisplay.push(array[i]);
        }
        setMethods(methodsToDisplay);
      }
    });

    return () => setMethods([]);
  }, [code]);

  const {
    modals: { transferMethodModalVisible },
    transactions: { code },
    wallet: { network },
    trade: {
      balance: { balances },
    },
  } = state;

  const hide = () => dispatch(toggleTransferMethodModal(false));

  const handlePress = (m) => {
    if (m === 'WIRE') dispatch(setNetwork('SWIFT'));
    if (m === 'ECOMMERCE') dispatch(setNetwork('CARD')); // Needs to be checked
    hide();
  };

  const text = (m) => {
    if (m === 'WIRE') return 'Swift Transfer';
    if (m === 'ECOMMERCE') return 'Visa or MC Card';
  };

  const background = (m) => {
    if (m === 'WIRE' && network === 'SWIFT') {
      return { backgroundColor: 'rgba(101, 130, 253, 0.1)' };
    }
  };

  const children = (
    <>
      {methods.map((m) => (
        <Pressable
          style={[styles.pressable, background(m)]}
          key={m}
          onPress={() => handlePress(m)}
        >
          <Image source={images.Swift} />
          <AppText body style={styles.primary}>
            {text(m)}
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
