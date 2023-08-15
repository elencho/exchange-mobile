import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../AppModal';
import ModalWithSearch from '../ModalWithSearch';
import { toggleCryptoModal } from '../../redux/modals/actions';
import {
  fetchTrades,
  instantTradeTabAction,
  setCrypto,
  setCryptoCodeQuery,
} from '../../redux/trade/actions';
import { setAbbr } from '../../redux/transactions/actions';

export default function CryptoModalTrade() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  // Crypto dropdown unda gaavasworo da satitaod movargo instants da transactions

  const {
    modals: { cryptoModalVisible },
    trade: { cryptoCodeQuery, offers, fiat, tradeType },
    transactions: { code: cryptoCodeTransactions, activeTab },
  } = state;

  const isInstantTrade = activeTab === 'Instant trade';
  const [filteredData, setFiletredData] = useState(offers?.[fiat]);
  const arrayToPass =
    filteredData?.length > 0
      ? [
          { name: 'Show all currency', title: 'Show all currency', code: '' },
          ...filteredData,
        ]
      : offers?.[fiat];

  useEffect(() => {
    dispatch(instantTradeTabAction());
    offers && setFiletredData(offers[fiat]);
  }, []);
  useEffect(() => {
    filter('');
  }, [cryptoModalVisible]);

  const filter = (text) => {
    const filteredArray = offers?.[fiat]?.filter(
      (c) =>
        (c?.pair?.baseCurrencyName &&
          c?.pair?.baseCurrencyName
            .toLowerCase()
            .includes(text.toLowerCase())) ||
        (c?.pair?.baseCurrency &&
          c?.pair?.baseCurrency.toLowerCase().includes(text.toLowerCase()))
    );
    setFiletredData(filteredArray);
  };

  const hide = () => dispatch(toggleCryptoModal(false));
  const onModalHide = () => dispatch(instantTradeTabAction());

  const choose = (code) => {
    dispatch(isInstantTrade ? setCryptoCodeQuery(code) : setAbbr(code));
    dispatch(fetchTrades());
    hide();
  };

  const children = (
    <ModalWithSearch
      array={arrayToPass}
      choose={choose}
      filter={filter}
      currentItem={isInstantTrade ? cryptoCodeQuery : cryptoCodeTransactions}
      crypto
      tradeType={tradeType}
      title="Choose Currency"
    />
  );

  return (
    filteredData && (
      <AppModal
        visible={cryptoModalVisible}
        hide={hide}
        children={children}
        onModalHide={onModalHide}
        fullScreen
      />
    )
  );
}
