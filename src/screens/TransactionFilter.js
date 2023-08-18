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
  setCryptoFilter,
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
import { clearFiltersTrade, setCryptoCodeQuery } from '../redux/trade/actions';

export default function TransactionFilter({ navigation, route }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    cryptoFilter: cryptoTransactions,
    method: selectedMethod,
    typeFilter,
    fromDateTime,
    toDateTime,
    status,
  } = state.transactions;
  const {
    fiatCodesQuery,
    statusQuery,
    cryptoCodeQuery,
    actionQuery,
    fromDateTimeQuery,
    toDateTimeQuery,
  } = state.trade;
  const {
    params: { isInstantTrade },
  } = route;

  const close = () => {
    clear();
    navigation.navigate('Main', { screen: 'Transactions' });
  };

  const clear = () => {
    if (isFilteredAny) {
      navigation.navigate('Main', { screen: 'Transactions' });
      isInstantTrade ? dispatch(clearFiltersTrade()) : dispatch(clearFilters());
      dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' });
    }
  };

  const seperateCurrencyName = (currency) => currency.split('(')[0];

  const openModal = () => dispatch(toggleCryptoModal(true));
  const handleMethodsDropdown = () => dispatch(toggleMethodsModal(true));
  const clearMethodsDropdown = () => dispatch(setMethodFilter(null));
  const clearCurrencyDropdown = () =>
    isInstantTrade
      ? dispatch(setCryptoCodeQuery(''))
      : dispatch(setCryptoFilter(null));

  const isFilteredTrades = Boolean(
    fiatCodesQuery?.length > 0 ||
      actionQuery?.length > 0 ||
      statusQuery?.length > 0 ||
      cryptoCodeQuery ||
      fromDateTimeQuery ||
      toDateTimeQuery
  );
  const isFilteredTransactions = Boolean(
    typeFilter ||
      cryptoTransactions ||
      fromDateTime ||
      toDateTime ||
      selectedMethod ||
      status
  );
  const isFilteredAny = isInstantTrade
    ? isFilteredTrades
    : isFilteredTransactions;

  const selectedCrypto = isInstantTrade ? cryptoCodeQuery : cryptoTransactions;

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
            selectedCrypto?.length > 0
              ? seperateCurrencyName(selectedCrypto)
              : 'Show All Currency'
          }
          activeLabel="Show All Currency"
          handleClear={clearCurrencyDropdown}
          icon={
            selectedCrypto && (
              <Image
                source={{
                  uri: `${COINS_URL_PNG}/${selectedCrypto?.toLowerCase()}.png`,
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

        <DatePicker from isInstantTrade={isInstantTrade} />
        <DatePicker to isInstantTrade={isInstantTrade} />

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

      <DatePickerModal isInstantTrade={isInstantTrade} from />
      <DatePickerModal isInstantTrade={isInstantTrade} to />
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
    marginBottom: 30,
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
    marginTop: 36,
  },
  marginBottom30: {
    marginBottom: 30,
  },
  marginBottom20: {
    marginVertical: 20,
  },
  text: {
    fontSize: 13,
    lineHeight: 17,
    color: colors.PRIMARY_TEXT,
    marginTop: 28,
    marginBottom: 12,
    color: colors.SECONDARY_TEXT,
  },
  bigText: {
    color: colors.PRIMARY_TEXT,
    flex: 1,
  },
});
