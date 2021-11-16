import React from 'react';
import { Image, Modal, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import AppText from '../AppText';
import ModalTop from '../ModalTop';
import Headline from './Headline';
import TransactionDetails from './TransactionDetails';
import colors from '../../constants/colors';

export default function TransactionModal() {
  const state = useSelector((state) => state.transactions);

  const {
    transactionModal,
    currentTransaction: { type, transactionInfo },
  } = state;

  return (
    <Modal animationType="slide" visible={transactionModal}>
      <View style={styles.container}>
        <ModalTop />

        <View style={styles.block}>
          <Headline title="Transaction Details" />

          <View style={styles.top}>
            <Image
              style={styles.deposit}
              source={require('../../assets/images/Deposit.png')}
            />

            <View style={styles.middle}>
              <AppText medium style={[styles.white, styles.capitalize]}>
                {type}
              </AppText>
              <AppText style={styles.text}>{transactionInfo}</AppText>
            </View>

            <Image
              source={require('../../assets/images/Copy.png')}
              style={styles.copy}
            />
          </View>

          <View style={styles.line} />

          <TransactionDetails />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  block: {
    padding: 40,
    paddingTop: 20,
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
  capitalize: { textTransform: 'capitalize' },
  copy: {
    alignSelf: 'flex-end',
  },
  container: {
    backgroundColor: 'rgba(15, 15, 31, 0.6)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  deposit: {
    width: 33,
    height: 33,
    resizeMode: 'contain',
    marginRight: 10,
  },
  middle: {
    justifyContent: 'space-between',
    flex: 1,
  },
  line: {
    height: 0.5,
    backgroundColor: colors.SECONDARY_TEXT,
    marginVertical: 15,
  },
  top: { flexDirection: 'row' },
  text: { fontSize: 12, color: colors.SECONDARY_TEXT },
  white: { fontSize: 14, color: colors.PRIMARY_TEXT },
});
