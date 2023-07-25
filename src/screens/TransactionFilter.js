import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
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
import {
  toggleCurrencyModal,
  toggleMethodsModal,
} from '../redux/modals/actions';
import colors from '../constants/colors';
import { types, statuses } from '../constants/filters';
import { COINS_URL_PNG } from '../constants/api';

import Arrow from '../assets/images/Arrow.svg';
import AppDropdown from '../components/AppDropdown';
import ChooseMethodsModal from './ChooseMethodsModal';

export default function TransactionFilter({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.transactions);
  const {
    currency,
    code,
    method: selectedMethod,
    typeFilter,
    fromDateTime,
    toDateTime,
  } = state;

  const openModal = () => dispatch(toggleCurrencyModal(true));

  const close = () => {
    clear();
    navigation.navigate('Main', { screen: 'Transactions' });
  };

  const clear = () => {
    dispatch(clearFilters());
    dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' });
  };

  const seperateCurrencyName = (currency) => currency.split('(')[0];

  const handleMethodsDropdown = () => dispatch(toggleMethodsModal(true));

  return (
    <Background>
      <View style={styles.closeContainer}>
        <Headline title="Transaction Filter" />
        <TouchableOpacity onPress={close} hitSlop={50}>
          <Close />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <AppText body style={styles.text}>
          Choose Type:
        </AppText>
        <FilterRow array={types} filterType="type" />

        <Pressable style={styles.dropdown} onPress={openModal}>
          {code && (
            <Image
              source={{ uri: `${COINS_URL_PNG}/${code?.toLowerCase()}.png` }}
              style={styles.coin}
            />
          )}
          <AppText body medium style={styles.bigText}>
            {seperateCurrencyName(currency) || 'Show All Currencies'}
          </AppText>
          <Arrow />
        </Pressable>

        <DatePicker from />
        <DatePicker to />

        <AppDropdown
          label="Choose Methods:"
          handlePress={handleMethodsDropdown}
          selectedText={selectedMethod}
        />

        <AppText body style={styles.text}>
          Choose Status:
        </AppText>
        <FilterRow array={statuses} filterType="status" />
      </ScrollView>

      <TransactionFilterBottom navigation={navigation} />
      <TouchableOpacity style={styles.clear} onPress={clear}>
        <PurpleText style={styles.purple} text="Clear Filters" />
      </TouchableOpacity>
      <ChooseCurrencyModal isForTransactions />

      <DatePickerModal from />
      <DatePickerModal to />
      <ChooseMethodsModal />
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingBottom: 140,
  },
  clear: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  coin: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  purple: {
    fontSize: 15,
    lineHeight: 19,
    marginHorizontal: 5,
  },
  closeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    justifyContent: 'space-between',
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
    lineHeight: 17,
    color: colors.PRIMARY_TEXT,
    marginVertical: 15,
  },
  bigText: {
    color: colors.PRIMARY_TEXT,
    flex: 1,
  },
});
