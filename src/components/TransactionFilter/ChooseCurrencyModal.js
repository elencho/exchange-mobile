import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import AppModal from '../AppModal';
import ModalWithSearch from '../ModalWithSearch';

import {
  currencyAction,
  fetchCurrencies,
  filterCurrencies,
} from '../../redux/transactions/actions';
import { toggleCurrencyModal } from '../../redux/modals/actions';
import {
  cryptoAddressesAction,
  setNetwork,
  setWalletTab,
  wireDepositAction,
} from '../../redux/wallet/actions';
import { setCurrentBalanceObj } from '../../redux/trade/actions';

function ChooseCurrencyModal({ wallet = false }) {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const {
    transactions: { currencies, currenciesConstant, currency, tabRouteName },
    modals: { chooseCurrencyModalVisible },
    trade: { balance, fiatsArray, currentBalanceObj },
    wallet: { walletTab },
  } = state;

  let walletCurrencies = currencies;

  useEffect(() => {
    chooseCurrencyModalVisible &&
      tabRouteName === 'Transactions' &&
      dispatch(fetchCurrencies());
  }, [chooseCurrencyModalVisible]);

  useEffect(() => {
    if (wallet) walletCurrencies.shift();
  }, [currencies]);

  const filter = (text) => {
    const filteredArray = currenciesConstant.filter(
      (c) =>
        c.name.toLowerCase().includes(text.toLowerCase()) ||
        c.code.toLowerCase().includes(text.toLowerCase())
    );
    dispatch(filterCurrencies(filteredArray));
  };

  const hide = () => {
    dispatch(toggleCurrencyModal(false));
  };

  const fiats = fiatsArray.map((f) => f.code);

  const choose = (name, code) => {
    dispatch(setNetwork(null));
    let network;
    const m = walletTab === 'Deposit' ? 'depositMethods' : 'withdrawalMethods';
    balance?.balances?.forEach((b) => {
      if (code === b.currencyCode) {
        if (b[m].WALLET) network = b[m].WALLET[0].provider;
        dispatch(setCurrentBalanceObj(b));
      }
    });

    if (wallet) {
      if (fiats.includes(code)) {
        walletTab === 'Whitelist' && dispatch(setWalletTab('Manage Cards'));
        dispatch(wireDepositAction(name, code, navigation));
      } else {
        walletTab === 'Manage Cards' && dispatch(setWalletTab('Whitelist'));
        dispatch(cryptoAddressesAction(name, code, navigation, network));
      }

      if (
        (walletTab === 'Manage Cards' && !fiats.includes(code)) ||
        (walletTab === 'Whitelist' && fiats.includes(code)) ||
        currentBalanceObj?.depositMethods?.ECOMMERCE
      ) {
        dispatch(setWalletTab('Deposit'));
      }
    } else {
      const currency = name === 'Show All Currency' ? null : code;
      dispatch(currencyAction(name, currenciesConstant, currency));
    }

    hide();
  };

  const children = (
    <ModalWithSearch
      array={walletCurrencies}
      choose={choose}
      filter={filter}
      currentItem={currency}
      title="Choose Currency"
    />
  );

  return (
    <AppModal
      visible={chooseCurrencyModalVisible}
      hide={hide}
      children={children}
      custom
    />
  );
}

export default ChooseCurrencyModal;
