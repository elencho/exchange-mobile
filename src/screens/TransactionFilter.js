import React from 'react';
import { Image, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../components/AppText';
import Background from '../components/Background';
import ChooseCurrencyModal from '../components/TransactionFilter/ChooseCurrencyModal';
import TransactionFilterBottom from '../components/TransactionFilter/TransactionFilterBottom';
import FilterRow from '../components/TransactionHistory/FilterRow';
import Headline from '../components/TransactionHistory/Headline';

import { types, methods } from '../constants/filters';
import colors from '../constants/colors';

import {
  clearFilters,
  toggleCurrencyModal,
} from '../redux/transactions/actions';
import DatePickerModal from '../components/TransactionFilter/DatePickerModal';
import DatePicker from '../components/TransactionFilter/DatePicker';

export default function TransactionFilter({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.transactions);

  const { currency } = state;

  const openModal = () => {
    dispatch(toggleCurrencyModal(true));
  };

  const clear = () => {
    dispatch(clearFilters());
  };

  return (
    <Background>
      <Pressable
        style={styles.closeContainer}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require('../assets/images/Close.png')}
          style={styles.close}
        />
      </Pressable>

      <Headline title="Transaction Filter" />

      <AppText style={styles.text}>Choose Type:</AppText>
      <FilterRow array={types} />

      <AppText style={styles.text}>Choose Methods:</AppText>
      <FilterRow array={methods} multiselect />

      <Pressable style={styles.dropdown} onPress={openModal}>
        <AppText medium style={styles.bigText}>
          {currency || 'Show All Currencies'}
        </AppText>
        <Image source={require('../assets/images/Arrow.png')} />
      </Pressable>

      <DatePicker from />
      <DatePicker to />

      <TouchableOpacity style={styles.clear} onPress={clear}>
        <Image source={require('../assets/images/Clear.png')} />
        <AppText medium style={styles.clearText}>
          Clear Filters
        </AppText>
      </TouchableOpacity>

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
  clearText: {
    fontSize: 15,
    color: colors.SECONDARY_PURPLE,
    marginHorizontal: 5,
  },
  close: {
    width: 15,
    height: 15,
  },
  closeContainer: {
    position: 'absolute',
    top: 25,
    right: 25,
  },
  dropdown: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'space-between',
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
    fontSize: 15,
    color: colors.PRIMARY_TEXT,
  },
});
