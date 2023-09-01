import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearFilters,
  showResultsAction,
} from '../../redux/transactions/actions';

import { clearFiltersTrade, fetchTrades } from '../../redux/trade/actions';
import { IS_ANDROID } from '../../constants/system';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PurpleText from '../PurpleText';

function TransactionFilterBottom({ navigation, isInstantTrade }) {
  const {
    transactions: {
      cryptoFilter: cryptoTransactions,
      method: selectedMethod,
      typeFilter,
      fromDateTime,
      toDateTime,
      status,
      loading: transactionsLoading,
    },
    trade: {
      fiatCodesQuery,
      statusQuery,
      cryptoCodeQuery,
      actionQuery,
      fromDateTimeQuery,
      toDateTimeQuery,
      tradesLoading,
    },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const isFilteredTrades = Boolean(
    fiatCodesQuery?.length > 0 ||
      actionQuery?.length > 0 ||
      statusQuery?.length > 0 ||
      cryptoCodeQuery ||
      fromDateTimeQuery ||
      toDateTimeQuery
  );
  const isFilteredTransactions = Boolean(
    typeFilter?.length > 0 ||
      cryptoTransactions ||
      fromDateTime ||
      toDateTime ||
      selectedMethod?.length > 0 ||
      status?.length > 0
  );
  const isFilteredAny = isInstantTrade
    ? isFilteredTrades
    : isFilteredTransactions;

  const showResults = () => {
    isInstantTrade
      ? dispatch(fetchTrades())
      : dispatch(showResultsAction(navigation));
    navigation.navigate('Main', {
      screen: 'Transactions',
      params: { isFromTransactions: true },
    });
  };

  const clear = () => {
    if (isFilteredAny) {
      navigation.navigate('Main', { screen: 'Transactions' });
      isInstantTrade ? dispatch(clearFiltersTrade()) : dispatch(clearFilters());
      dispatch({ type: 'REFRESH_TRANSACTIONS_ACTION' });
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={showResults}>
        <AppText medium style={styles.white}>
          Show Result
        </AppText>
      </Pressable>
      <TouchableOpacity style={styles.clear} onPress={clear}>
        <PurpleText
          style={styles.purple}
          text="Clear Filters"
          disabled={!isFilteredAny}
        />
      </TouchableOpacity>
    </View>
  );
}

export default TransactionFilterBottom;

const styles = StyleSheet.create({
  purple: {
    fontSize: 14,
    lineHeight: 18,
    marginTop: 30,
    marginBottom: IS_ANDROID ? 14 : 44,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: colors.PRIMARY_PURPLE,
    paddingVertical: 15,
    alignItems: 'center',
  },
  container: {
    //
  },
  download: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  white: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.PRIMARY_TEXT,
  },
  clear: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
