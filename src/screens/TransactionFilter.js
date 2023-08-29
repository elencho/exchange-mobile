import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

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
  setPreviousTransactionsFilter,
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
import {
  clearFiltersTrade,
  setCryptoCodeQuery,
  setPreviousTradeFilter,
} from '../redux/trade/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const FILTER_BOTTOM_HEIGHT = 125;
const HEADER_HEIGHT = 50;

export default function TransactionFilter({ navigation, route }) {
  const [scrollHeight, setScrollHeight] = useState(null);
  const [top, setTop] = useState(null);

  useLayoutEffect(() => {
    setTop(scrollHeight);
  }, [scrollHeight]);

  const dispatch = useDispatch();
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
  const {
    params: { isInstantTrade },
  } = route;

  const close = async () => {
    const prevFilter = isInstantTrade
      ? await AsyncStorage.getItem('tradesFilter')
      : await AsyncStorage.getItem('transactionsFilter');
    isInstantTrade
      ? dispatch(setPreviousTradeFilter(prevFilter))
      : dispatch(setPreviousTransactionsFilter(prevFilter));
    navigation.navigate('Main', { screen: 'Transactions' });
  };

  const seperateCurrencyName = (currency) => currency.split('(')[0];

  const openModal = () => dispatch(toggleCryptoModal(true));
  const handleMethodsDropdown = () => dispatch(toggleMethodsModal(true));
  const clearMethodsDropdown = () => dispatch(setMethodFilter([]));
  const clearCurrencyDropdown = () =>
    isInstantTrade
      ? dispatch(setCryptoCodeQuery(''))
      : dispatch(setCryptoFilter(null));

  const selectedCrypto = isInstantTrade ? cryptoCodeQuery : cryptoTransactions;

  useEffect(() => {
    const initialStateTrade = {
      fiatCodesQuery,
      statusQuery,
      cryptoCodeQuery,
      actionQuery,
      fromDateTimeQuery,
      toDateTimeQuery,
    };
    const initialStateTransactions = {
      cryptoFilter: cryptoTransactions,
      method: selectedMethod,
      typeFilter,
      fromDateTime,
      toDateTime,
      status,
    };
    isInstantTrade
      ? AsyncStorage.setItem(
          'tradesFilter',
          JSON.stringify({ ...initialStateTrade })
        )
      : AsyncStorage.setItem(
          'transactionsFilter',
          JSON.stringify({ ...initialStateTransactions })
        );
  }, []);

  const numOfRender = useRef(0);

  const setScrollHeightCallback = useCallback((e) => {
    if (numOfRender.current === 0) {
      setScrollHeight(e.nativeEvent.layout.height);
      numOfRender.current++;
    }
  }, []);

  return (
    <Background>
      <View style={styles.closeContainer}>
        <Headline title="Transaction Filter" />
        <TouchableOpacity
          onPress={close}
          hitSlop={50}
          style={styles.closeButton}
        >
          <Close />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          onLayout={(e) => {
            setScrollHeightCallback(e);
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View>
            {isInstantTrade ? (
              <View style={styles.marginBottom20}>
                <AppText body style={styles.text}>
                  Choose currency / Pair
                </AppText>
                <FilterRow array={currencies} filterType="currency" />
              </View>
            ) : (
              <View style={styles.type}>
                <AppText body style={styles.text}>
                  Choose Type:
                </AppText>
                <FilterRow array={types} filterType="type" />
              </View>
            )}

            <AppDropdown
              selectedText={
                selectedCrypto?.length > 0 &&
                seperateCurrencyName(selectedCrypto)
              }
              label="Choose Crypto"
              handleClear={clearCurrencyDropdown}
              icon={
                selectedCrypto &&
                selectedCrypto !== 'Show all currency' && (
                  <Image
                    source={{
                      uri: `${COINS_URL_PNG}/${selectedCrypto?.toLowerCase()}.png`,
                    }}
                    style={styles.coin}
                  />
                )
              }
              handlePress={openModal}
              style={!isInstantTrade && { marginVertical: 24 }}
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
                selectedText={selectedMethod?.[0] ?? null}
              />
            )}

            <AppText
              body
              style={[styles.text, isInstantTrade && styles.status]}
            >
              Choose Status:
            </AppText>
            <FilterRow
              array={statuses}
              filterType={`status${isInstantTrade ? 'Trade' : 'Transaction'}`}
            />
          </View>

          <View style={{ marginTop: WINDOW_HEIGHT - scrollHeight - 30 }}>
            <TransactionFilterBottom
              navigation={navigation}
              isInstantTrade={isInstantTrade}
            />
          </View>
        </ScrollView>
      </View>

      <CryptoModalTrade />

      <DatePickerModal isInstantTrade={isInstantTrade} from />
      <DatePickerModal isInstantTrade={isInstantTrade} to />
      <ChooseMethodsModal />
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: -32,
    paddingBottom: 140,
  },
  coin: {
    width: 24,
    height: 24,
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
    backgroundColor: colors.PRIMARY_BACKGROUND,
    zIndex: 10,
    paddingBottom: 10,
  },
  marginBottom30: {
    marginBottom: 30,
  },
  marginBottom20: {
    marginVertical: 20,
  },
  text: {
    fontSize: 14,
    lineHeight: 17,
    color: '#c0c5e0',
    marginTop: 30,
    marginBottom: 12,
  },
  status: {
    marginTop: 6,
  },
  bigText: {
    color: colors.PRIMARY_TEXT,
    flex: 1,
  },
  closeButton: {
    marginTop: -40,
  },
  type: { marginTop: 20, marginBottom: 6 },
});
