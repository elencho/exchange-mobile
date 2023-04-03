import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import AppModal from '../AppModal';
import ModalWithSearch from '../ModalWithSearch';

import {
  currencyAction,
  fetchCurrencies,
} from '../../redux/transactions/actions';
import { toggleCurrencyModal } from '../../redux/modals/actions';
import {
  cryptoAddressesAction,
  saveCryptoAddress,
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
    transactions: { currencies, currenciesConstant, currency, code },
    modals: { chooseCurrencyModalVisible },
    trade: { balance, fiatsArray, currentBalanceObj },
    wallet: { walletTab },
  } = state;

  const [filteredData, setFiletredData] = useState(balance?.balances);

  useEffect(() => {
    if (wallet && filteredData[0]?.name === 'Show All Currency') {
      filteredData.shift();
    }
  }, [currencies]);

  const filter = (text) => {
    const filteredArray = balance?.balances.filter(
      (c) =>
        c.currencyCode.toLowerCase().includes(text.toLowerCase()) ||
        c.currencyName.toLowerCase().includes(text.toLowerCase())
    );
    setFiletredData(filteredArray);
  };

  const hide = () => dispatch(toggleCurrencyModal(false));
  const onModalHide = () => dispatch(fetchCurrencies());

  const fiats = fiatsArray.map((f) => f.code);

  const choose = (name, currencyCode) => {
    if (code === currencyCode) {
      hide();
      return;
    }

    dispatch(setNetwork(null));
    let network;
    // const m = walletTab === 'Deposit' ? 'depositMethods' : 'withdrawalMethods';
    // Cryptoadresses is only needed in Deposit wallet tab
    const m = 'depositMethods';
    balance?.balances?.forEach((b) => {
      if (currencyCode === b.currencyCode) {
        if (b[m].WALLET) network = b[m].WALLET[0].provider;
        dispatch(setCurrentBalanceObj(b));
      }
    });

    if (wallet) {
      if (fiats.includes(currencyCode)) {
        dispatch(wireDepositAction(name, currencyCode, navigation));
        dispatch(saveCryptoAddress({}));
      } else {
        dispatch(
          cryptoAddressesAction(name, currencyCode, navigation, network)
        );
      }

      if (
        (walletTab === 'Manage Cards' && !fiats.includes(currencyCode)) ||
        (walletTab === 'Whitelist' && fiats.includes(currencyCode)) ||
        currentBalanceObj?.depositMethods?.ECOMMERCE
      ) {
        dispatch(setWalletTab('Deposit'));
      }
    } else {
      const currency = name === 'Show All Currency' ? null : currencyCode;
      dispatch(currencyAction(name, currenciesConstant, currency));
    }

    hide();
  };

  const children = (
    <ModalWithSearch
      array={filteredData}
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
      onModalHide={onModalHide}
      custom
    />
  );
}

export default ChooseCurrencyModal;
