import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Background from '../../components/Background';
import Headline from '../../components/TransactionHistory/Headline';
import PurpleText from '../../components/PurpleText';
import Back from '../../assets/images/Back.svg';
import WalletSwitcher from '../../components/Wallet/WalletSwitcher';
import Deposit from './Deposit';
import Withdrawal from './Withdrawal';
import ChooseCurrencyModal from '../../components/TransactionFilter/ChooseCurrencyModal';
import ChooseNetworkModal from '../../components/Wallet/Deposit/ChooseNetworkModal';
import Whitelist from './Whitelist';
import ManageCards from './ManageCards';
import { setCard, setDepositProvider } from '../../redux/trade/actions';
import {
  setShouldRefreshOnScroll,
  setWalletTab,
} from '../../redux/wallet/actions';
import CustomRefreshContol from '../../components/CustomRefreshContol';
import { IS_ANDROID } from '../../constants/system';

export default function Balance({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    wallet: { walletTab, network, shouldRefreshOnScroll },
    trade: { cardsLoading },
    transactions: { tabNavigationRef, loading },
  } = state;

  const onRefresh = () => {
    if (shouldRefreshOnScroll || IS_ANDROID) {
      dispatch(setCard(null));
      dispatch({ type: 'REFRESH_WALLET_AND_TRADES' });
      walletTab !== 'Whitelist' && dispatch({ type: 'CLEAN_WALLET_INPUTS' });
      if (network !== 'SWIFT') {
        dispatch(setDepositProvider(null));
      }
      dispatch(setShouldRefreshOnScroll(false));
    }
  };

  const back = () => {
    dispatch(setWalletTab('Deposit'));
    tabNavigationRef.navigate('Wallet');
    navigation.navigate('Main', { screen: 'Wallet' });
  };

  useEffect(() => {
    onRefresh();
    return () => dispatch(setCard(null));
  }, [walletTab, network, shouldRefreshOnScroll]);

  const refreshControl = (isTransparent = false) => {
    const props = { onRefresh, refreshing: loading || cardsLoading };
    if (isTransparent) props.tintColor = 'transparent';

    return <CustomRefreshContol {...props} />;
  };

  const disabled = loading || cardsLoading;

  return (
    <Background>
      <TouchableOpacity onPress={back} style={styles.back} disabled={disabled}>
        <Back tyle={styles.arrow} />
        <PurpleText text="Back to Wallet" style={styles.purpleText} />
      </TouchableOpacity>

      <Headline title="My Wallet" />

      <WalletSwitcher />

      {walletTab === 'Deposit' && <Deposit refreshControl={refreshControl()} />}
      {walletTab === 'Withdrawal' && (
        <Withdrawal refreshControl={refreshControl()} />
      )}
      {walletTab === 'Whitelist' && (
        <Whitelist refreshControl={refreshControl()} />
      )}
      {walletTab === 'Manage Cards' && (
        <ManageCards refreshControl={refreshControl(true)} />
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
