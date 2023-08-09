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

import {
  clearFilters,
  currencyAction,
  setMethodFilter,
} from '../redux/transactions/actions';
import {
  toggleCryptoModal,
  toggleCurrencyModal,
  toggleMethodsModal,
} from '../redux/modals/actions';
import colors from '../constants/colors';
import {
  types,
  statuses,
  currencies,
  transactionTypes,
} from '../constants/filters';
import { COINS_URL_PNG } from '../constants/api';

import Arrow from '../assets/images/Arrow.svg';
import AppDropdown from '../components/AppDropdown';
import ChooseMethodsModal from './ChooseMethodsModal';
import CryptoModalTrade from '../components/InstantTrade/CryptoModalTrade';

export default function TransactionFilter({ navigation, route }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    currency,
    code,
    method: selectedMethod,
    typeFilter,
    fromDateTime,
    toDateTime,
    status,
  } = state.transactions;
  const { fiatCodesQuery, statusQuery, cryptoCodeQuery, actionQuery } =
    state.trade;
  const {
    params: { isInstantTrade },
  } = route;

  const close = () => {
    clear();
    navigation.navigate('Main', { screen: 'Transactions' });
  };

  const clear = () => {
    if (isFilteredAny) {
      dispatch(clearFilters());
      dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' });
    }
  };

  const seperateCurrencyName = (currency) => currency.split('(')[0];

  const openModal = () => dispatch(toggleCryptoModal(true));
  const handleMethodsDropdown = () => dispatch(toggleMethodsModal(true));
  const clearMethodsDropdown = () => dispatch(setMethodFilter(null));
  const clearCurrencyDropdown = () =>
    dispatch(currencyAction('Show All Currency', [], null));
  const isFilteredAny = Boolean(
    typeFilter ||
      selectedMethod ||
      status ||
      fromDateTime ||
      toDateTime ||
      code ||
      fiatCodesQuery.length > 0 ||
      statusQuery.length > 0 ||
      cryptoCodeQuery ||
      actionQuery.length > 0
  );

  return (
    <Background>
      <View style={styles.closeContainer}>
        <Headline title="Transaction Filter" />
        <TouchableOpacity onPress={close} hitSlop={50}>
          <Close />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        {isInstantTrade ? (
          <View style={styles.marginBottom20}>
            <AppText body style={styles.text}>
              Choose currency / Pair
            </AppText>
            <FilterRow array={currencies} filterType="currency" />
          </View>
        ) : (
          <View style={styles.marginBottom20}>
            <AppText body style={styles.text}>
              Choose Type:
            </AppText>
            <FilterRow array={types} filterType="type" />
          </View>
        )}

        <AppDropdown
          selectedText={
            cryptoCodeQuery?.length > 0
              ? seperateCurrencyName(cryptoCodeQuery)
              : 'Show All Currency'
          }
          activeLabel="Show All Currency"
          handleClear={clearCurrencyDropdown}
          icon={
            cryptoCodeQuery && (
              <Image
                source={{
                  uri: `${COINS_URL_PNG}/${cryptoCodeQuery?.toLowerCase()}.png`,
                }}
                style={styles.coin}
              />
            )
          }
          handlePress={openModal}
          style={!isInstantTrade && { marginBottom: 24 }}
        />

        {isInstantTrade && (
          <View style={styles.marginBottom30}>
            <AppText body style={styles.text}>
              Transaction Type:
            </AppText>
            <FilterRow array={transactionTypes} filterType="tradeAction" />
          </View>
        )}

        <DatePicker from />
        <DatePicker to />

        {!isInstantTrade && (
          <AppDropdown
            label="Choose Methods:"
            handlePress={handleMethodsDropdown}
            handleClear={clearMethodsDropdown}
            selectedText={selectedMethod}
          />
        )}

        <AppText body style={styles.text}>
          Choose Status:
        </AppText>
        <FilterRow
          array={statuses}
          filterType={`status${isInstantTrade ? 'Trade' : 'Transaction'}`}
        />
      </ScrollView>

      <TransactionFilterBottom
        navigation={navigation}
        isInstantTrade={isInstantTrade}
      />
      <TouchableOpacity style={styles.clear} onPress={clear}>
        <PurpleText
          style={styles.purple}
          text="Clear Filters"
          disabled={!isFilteredAny}
        />
      </TouchableOpacity>
      <CryptoModalTrade />

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
  marginBottom30: {
    marginBottom: 30,
  },
  marginBottom20: {
    marginBottom: 20,
  },
  text: {
    fontSize: 13,
    lineHeight: 17,
    color: colors.PRIMARY_TEXT,
    marginVertical: 12,
    color: colors.SECONDARY_TEXT,
  },
  bigText: {
    color: colors.PRIMARY_TEXT,
    flex: 1,
  },
});
