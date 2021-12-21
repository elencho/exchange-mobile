import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import AppModal from '../AppModal';
import AppText from '../AppText';
import Background from '../Background';
import CloseModalIcon from './CloseModalIcon';
import { toggleInfoModal } from '../../redux/modals/actions';
import colors from '../../constants/colors';

export default function InfoModal() {
  const dispatch = useDispatch();
  const infoVisible = useSelector((state) => state.modals.infoVisible);

  const hide = () => {
    dispatch(toggleInfoModal(false));
  };

  const children = (
    <ScrollView>
      <TouchableOpacity activeOpacity={0.99}>
        <AppText header style={styles.header}>
          What is Instant Trade
        </AppText>

        <AppText body style={styles.text}>
          Instant trade simplifies buying and selling crypto currencies. If you
          have a limited understanding of how crypto exchanges work but want to
          get started with cryptocurrencies, our instant trade service is for
          you.
        </AppText>

        <AppText header style={[styles.header, { marginTop: 40 }]}>
          How Does it Work?
        </AppText>
        <AppText body style={styles.text}>
          Cryptal.com calculates the price and freezes it for 90 seconds. At any
          given moment, either select from one of our standard offers or
          manually input the amount of money you wish to spend, and you will see
          the amount of cryptocurrency you will receive, or vice versa.
        </AppText>
        <AppText body style={styles.text}>
          You can buy coins either from your fiat balance or with your
          Visa/Mastercard.
        </AppText>
        <AppText body style={styles.text}>
          When buying cryptocurrencies, indicate the withdrawal address only if
          you want to withdraw to an external address, otherwise your purchases
          will be reflected in your Cryptal wallet balance.
        </AppText>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <AppModal
      hide={hide}
      visible={infoVisible}
      fullScreen
      children={children}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    color: '#C0C5E0',
  },
  text: {
    color: colors.SECONDARY_TEXT,
    textAlign: 'justify',
    marginTop: 15,
  },
});
