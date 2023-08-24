import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import Background from '../../components/Background';
import TopRow from '../../components/TransactionHistory/TopRow';
import TotalBalance from '../../components/Wallet/TotalBalance';
import BalancesList from '../../components/Wallet/BalancesList';
import colors from '../../constants/colors';
import CustomRefreshContol from '../../components/CustomRefreshContol';
import { useFocusEffect } from '@react-navigation/native';
import BalanceSearchBar from '../../components/Wallet/BalanceSearchBar';
import { useSharedValue, withTiming } from 'react-native-reanimated';

export default function Wallet() {
  const dispatch = useDispatch();
  const balanceLoading = useSelector((state) => state.trade.balanceLoading);
  const balances = useSelector((state) => state.trade.balance.balances);

  const inputRef = useRef();
  const [filteredBalances, setFilteredBalances] = useState([]);
  const [showRefreshControl, setShowRefreshControl] = useState(false);
  const [value, setValue] = useState('');
  const [showZeroBalances, setShowZeroBalances] = useState(true);
  const [nonZeroBalances, setNonZeroBalances] = useState([]);

  useFocusEffect(
    useCallback(() => {
      hideButtonsHandler();
      const timer = setTimeout(() => {
        setShowRefreshControl(true);
      }, 1000);
      return () => {
        onRefresh();
        clearTimeout(timer);
        setShowZeroBalances(true);
        setValue('');
      };
    }, [])
  );

  useEffect(() => {
    if (balances) type(value);
  }, [showZeroBalances]);

  useEffect(() => {
    if (balances) {
      const nonZeroBalances = balances.filter((b) => b.total > 0);
      setNonZeroBalances(nonZeroBalances);
      setFilteredBalances(balances);
    }
  }, [balances]);

  const type = (text) => {
    setValue(text);
    const array = showZeroBalances ? balances : nonZeroBalances;
    const filteredArray = array?.filter((c) => {
      return (
        c.currencyCode.toLowerCase().includes(text.toLowerCase()) ||
        c.currencyName.toLowerCase().includes(text.toLowerCase())
      );
    });
    setFilteredBalances(filteredArray);
  };

  const onRefresh = () => {
    hideButtonsHandler();
    setValue('');
    setShowZeroBalances(true);
    dispatch({ type: 'REFRESH_WALLET_AND_TRADES' });
  };

  const animatedValue = useSharedValue(8);

  const showButtonsHandler = () => {
    animatedValue.value = withTiming(100, { duration: 400 });
    setShowZeroBalances(true);
    inputRef.current?.focus();
  };
  const hideButtonsHandler = () => {
    type('');
    inputRef.current?.blur();
    animatedValue.value = withTiming(8, { duration: 400 });
  };

  const onScroll = () => {
    if (!value) {
      hideButtonsHandler();
      Keyboard.dismiss();
    }
  };
  return (
    <Background>
      <TopRow />
      <KeyboardAvoidingView behavior="padding">
        <ScrollView
          onScroll={onScroll}
          refreshControl={
            showRefreshControl ? (
              <CustomRefreshContol
                refreshing={balanceLoading}
                onRefresh={onRefresh}
              />
            ) : null
          }
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1]}
        >
          <TotalBalance balanceLoading={balanceLoading} />
          <BalanceSearchBar
            animatedValue={animatedValue}
            showButtonsHandler={showButtonsHandler}
            hideButtonsHandler={hideButtonsHandler}
            setShowZeroBalances={setShowZeroBalances}
            value={value}
            type={type}
            showZeroBalances={showZeroBalances}
            ref={inputRef}
          />
          <BalancesList
            balanceLoading={balanceLoading}
            filteredBalances={filteredBalances}
          />
          <View style={styles.footer} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Background>
  );
}

const styles = StyleSheet.create({
  topRowStyle: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    marginBottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  footer: {
    height: 50,
    width: 100,
  },
});
