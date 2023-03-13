import React, { useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Background from '../../components/Background';
import Headline from '../../components/TransactionHistory/Headline';
import PurpleText from '../../components/PurpleText';
import images from '../../constants/images';
import WalletSwitcher from '../../components/Wallet/WalletSwitcher';
import Deposit from './Deposit';
import Withdrawal from './Withdrawal';
import ChooseCurrencyModal from '../../components/TransactionFilter/ChooseCurrencyModal';
import ChooseNetworkModal from '../../components/Wallet/Deposit/ChooseNetworkModal';
import Whitelist from './Whitelist';
import ManageCards from './ManageCards';
import { setCard, setDepositProvider } from '../../redux/trade/actions';
import { setWalletTab } from '../../redux/wallet/actions';
import CustomRefreshContol from '../../components/CustomRefreshContol';

export default function Balance({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    wallet: { walletTab, network },
    trade: { cardsLoading },
    transactions: { tabNavigationRef, loading },
  } = state;

  const onRefresh = () => {
    dispatch(setCard(null));
    dispatch({ type: 'REFRESH_WALLET_AND_TRADES' });
    walletTab !== 'Whitelist' && dispatch({ type: 'CLEAN_WALLET_INPUTS' });
    if (network !== 'SWIFT') {
      dispatch(setDepositProvider(null));
    }
  };

  const back = () => {
    dispatch(setWalletTab('Deposit'));
    tabNavigationRef.navigate('Wallet');
    navigation.navigate('Main');
  };

  useEffect(() => {
    onRefresh();
    return () => dispatch(setCard(null));
  }, [walletTab, network]);

  const refreshControl = (
    <CustomRefreshContol onRefresh={onRefresh} refreshing={loading} />
  );

  const disabled = loading || cardsLoading;

  return (
    <Background>
      <TouchableOpacity onPress={back} style={styles.back} disabled={disabled}>
        <Image source={images.Back} style={styles.arrow} />
        <PurpleText text="Back to Wallet" style={styles.purpleText} />
      </TouchableOpacity>

      <Headline title="My Wallet" />

      <WalletSwitcher />

      {walletTab === 'Deposit' && <Deposit refreshControl={refreshControl} />}
      {walletTab === 'Withdrawal' && (
        <Withdrawal refreshControl={refreshControl} />
      )}
      {walletTab === 'Whitelist' && (
        <Whitelist refreshControl={refreshControl} />
      )}
      {walletTab === 'Manage Cards' && (
        <ManageCards refreshControl={refreshControl} />
      )}

      <ChooseCurrencyModal wallet />
      <ChooseNetworkModal />
    </Background>
  );
}

const styles = StyleSheet.create({
  arrow: {
    marginTop: 2,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 5,
    width: '45%',
  },
  flexGrow: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  purpleText: {
    marginHorizontal: 10,
  },
});
