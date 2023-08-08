import React, { useCallback, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import CustomRefreshContol from '../components/CustomRefreshContol';
import Background from '../components/Background';
import BuySellSwitch from '../components/InstantTrade/BuySellSwitch';
import InfoMark from '../components/InstantTrade/InfoMark';
import TradeBlock from '../components/InstantTrade/TradeBlock';
import TransactionsBlock from '../components/InstantTrade/TransactionsBlock';
import Headline from '../components/TransactionHistory/Headline';
import TopRow from '../components/TransactionHistory/TopRow';
import BuySellModal from '../components/InstantTrade/BuySellModal';
import InfoModal from '../components/InstantTrade/InfoModal';
import TransactionModal from '../components/TransactionHistory/TransactionModal';
import CryptoModal from '../components/InstantTrade/CryptoModal';
import FiatModal from '../components/InstantTrade/FiatModal';
import TradeBlockSkeleton from '../components/InstantTrade/TradeBlockSkeleton';

import colors from '../constants/colors';
import { setTradeOffset, setTradeType } from '../redux/trade/actions';
import { setWalletTab } from '../redux/wallet/actions';
import { toggleChooseCardModal } from '../redux/modals/actions';

import messaging from '@react-native-firebase/messaging';
import useNotificationPermissions from './useNotificationPermissions';

export default function InstantTrade() {
  useNotificationPermissions();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    trade: { tradesLoading, offersLoading },
    transactions: { tabRoute },
    profile: { userProfileLoading },
  } = state;

  const loading = tradesLoading && offersLoading;
  const onRefresh = () => {
    dispatch(setWalletTab('Deposit'));
    dispatch({ type: 'REFRESH_WALLET_AND_TRADES' });
    dispatch(setTradeOffset(0));
  };

  const [showRefreshControl, setShowRefreshControl] = useState(false);

  useFocusEffect(
    useCallback(() => {
      tabRoute === 'Trade' && onRefresh();
      const timer = setTimeout(() => {
        setShowRefreshControl(true);
      }, 1000);
      return () => {
        dispatch(toggleChooseCardModal(false));
        clearTimeout(timer);
      };
    }, [tabRoute])
  );

  //ToDo: delete
  const [fcmToken, setFcmToken] = useState('');
  const checkToken = async () => {
    const token = await messaging().getToken();
    if (token) {
      setFcmToken(token);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Background>
      <TopRow
        headlineLogo={<InfoMark inner="?" color={colors.SECONDARY_PURPLE} />}
        clear={() => dispatch(setTradeType('Buy'))}
      />

      <BuySellSwitch />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ overflow: 'hidden' }}
        contentContainerStyle={{ overflow: 'hidden' }}
        refreshControl={
          showRefreshControl ? (
            <CustomRefreshContol refreshing={loading} onRefresh={onRefresh} />
          ) : null
        }
      >
        {offersLoading || userProfileLoading ? (
          <TradeBlockSkeleton />
        ) : (
          <TradeBlock />
        )}
      </ScrollView>

      <InfoModal />
      <BuySellModal />
      <CryptoModal />
      <FiatModal />
      <TransactionModal trades />
    </Background>
  );
}

const styles = StyleSheet.create({
  headRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
