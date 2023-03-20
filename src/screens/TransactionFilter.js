import React from 'react';
import { Image, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../components/AppText';
import Background from '../components/Background';
import ChooseCurrencyModal from '../components/TransactionFilter/ChooseCurrencyModal';
import TransactionFilterBottom from '../components/TransactionFilter/TransactionFilterBottom';
import FilterRow from '../components/TransactionHistory/FilterRow';
import Headline from '../components/TransactionHistory/Headline';
import DatePickerModal from '../components/TransactionFilter/DatePickerModal';
import DatePicker from '../components/TransactionFilter/DatePicker';
import Close from '../assets/images/Close.svg';
import PurpleText from '../components/PurpleText';

import { clearFilters } from '../redux/transactions/actions';
import { toggleCurrencyModal } from '../redux/modals/actions';
import images from '../constants/images';
import colors from '../constants/colors';
import { types, methods } from '../constants/filters';
import { COINS_URL_PNG } from '../constants/api';
import FastImage from 'react-native-fast-image';

export default function TransactionFilter({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.transactions);
  const { currency, code, method, typeFilter, fromDateTime, toDateTime } =
    state;

  const openModal = () => dispatch(toggleCurrencyModal(true));

  const close = () => {
    clear();
    navigation.goBack();
  };

  const clear = () => {
    dispatch(clearFilters());
    dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' });
  };

  const clearCond =
    code || typeFilter || fromDateTime || toDateTime || method[0] !== 'All';

  return (
    <Background>
      <TouchableOpacity style={styles.closeContainer} onPress={close}>
        <Close />
      </TouchableOpacity>

      <Headline title="Transaction Filter" />

      <AppText style={styles.text}>Choose Type:</AppText>
      <FilterRow array={types} />

      <AppText style={styles.text}>Choose Methods:</AppText>
      <FilterRow array={methods} multiselect />

      <Pressable style={styles.dropdown} onPress={openModal}>
        {code && (
          <FastImage
            source={{ uri: `${COINS_URL_PNG}/${code?.toLowerCase()}.png` }}
            style={styles.coin}
          />
        )}
        <AppText medium style={styles.bigText}>
          {currency || 'Show All Currencies'}
        </AppText>
        <Image source={images.Arrow} />
      </Pressable>

      <DatePicker from />
      <DatePicker to />

      {clearCond && (
        <TouchableOpacity style={styles.clear} onPress={clear}>
          <Image source={images.Clear} />
          <PurpleText style={styles.purple} text="Clear Filters" />
        </TouchableOpacity>
      )}

      <TransactionFilterBottom />
      <ChooseCurrencyModal />

      <DatePickerModal from />
      <DatePickerModal to />
    </Background>
  );
}

const styles = StyleSheet.create({
  clear: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  coin: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  purple: {
    fontSize: 15,
    marginHorizontal: 5,
  },
  closeContainer: {
    position: 'absolute',
    top: 10,
    right: 20,
    padding: 5,
  },
  dropdown: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#42475D',
    marginVertical: 25,
  },
  text: {
    fontSize: 13,
    color: colors.PRIMARY_TEXT,
    marginVertical: 15,
  },
  bigText: {
    color: colors.PRIMARY_TEXT,
    flex: 1,
  },
});
