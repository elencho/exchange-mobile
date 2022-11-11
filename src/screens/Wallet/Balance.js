import React, { useEffect } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
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
import colors from '../../constants/colors';
import { setCard, setDepositProvider, setFee } from '../../redux/trade/actions';

export default function Balance({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    wallet: { walletTab, network },
    transactions: { tabNavigationRef, code },
  } = state;

  const onRefresh = () => {
    dispatch({ type: 'REFRESH_WALLET_AND_TRADES' });
    dispatch({ type: 'CLEAN_WALLET_INPUTS' });
    dispatch(setCard(null));
    dispatch(setFee(null));
    if (network !== 'SWIFT') {
      dispatch(setDepositProvider(null));
    }
  };

  const back = () => {
    tabNavigationRef.navigate('Wallet');
    navigation.navigate('Main');
  };

  useEffect(() => {
    onRefresh();
  }, [walletTab, code]);

  return (
    <Background>
      <View style={styles.back}>
        <Image source={images.Back} style={styles.arrow} />
        <PurpleText
          text="Back to Wallet"
          onPress={back}
          style={styles.purpleText}
        />
      </View>

      <Headline title="My Wallet" />

      <WalletSwitcher />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.select({ android: undefined, ios: 'padding' })}
        keyboardVerticalOffset={Platform.select({ ios: 50, android: 500 })}
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              tintColor={colors.PRIMARY_PURPLE}
              onRefresh={onRefresh}
            />
          }
        >
          {walletTab === 'Deposit' && <Deposit />}
          {walletTab === 'Withdrawal' && <Withdrawal />}
          {walletTab === 'Whitelist' && <Whitelist />}
          {walletTab === 'Manage Cards' && <ManageCards />}
        </ScrollView>
      </KeyboardAvoidingView>

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
