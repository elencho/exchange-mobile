import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Clipboard from 'expo-clipboard';

import AppText from '../AppText';
import ModalTop from '../ModalTop';
import TransactionDetails from './TransactionDetails';
import colors from '../../constants/colors';
import AppModal from '../AppModal';
import { toggleTransactionDetails } from '../../redux/modals/actions';

export default function TransactionModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.transactions);
  const transactionDetailsVisible = useSelector(
    (state) => state.modals.transactionDetailsVisible
  );

  const {
    currentTransaction: { type, transactionInfo },
  } = state;

  const copy = () => {
    Clipboard.setString(transactionInfo);
  };

  const hide = () => {
    dispatch(toggleTransactionDetails(false));
  };

  return (
    <AppModal bottom hide={hide} visible={transactionDetailsVisible}>
      <View>
        <ModalTop />

        <View style={styles.block}>
          <AppText header style={styles.header}>
            Transaction Details
          </AppText>

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

            <TouchableOpacity style={styles.copy} onPress={copy}>
              <Image source={require('../../assets/images/Copy.png')} />
            </TouchableOpacity>
          </View>

          <View style={styles.line} />

          <TransactionDetails />
        </View>
      </View>
    </AppModal>
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
    flex: 1,
    justifyContent: 'flex-end',
  },
  deposit: {
    marginRight: 10,
    alignSelf: 'center',
  },
  header: {
    color: colors.PRIMARY_TEXT,
    marginBottom: 20,
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
  text: { fontSize: 12, color: colors.SECONDARY_TEXT, marginTop: 5 },
  white: { fontSize: 14, color: colors.PRIMARY_TEXT },
});
