import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../AppModal';
import ModalWithSearch from '../ModalWithSearch';

import {
  fetchCurrencies,
  filterCurrencies,
} from '../../redux/transactions/actions';
import { toggleCryptoModal } from '../../redux/modals/actions';
import { instantTradeTabAction, setCrypto } from '../../redux/trade/actions';

export default function CryptoModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const {
    modals: { cryptoModalVisible },
    trade: { crypto, offers, fiat, tradeType },
  } = state;

  const [filteredData, setFiletredData] = useState(offers[fiat]);

  useEffect(() => {
    dispatch({ type: 'INSTANT_TRADE_TAB_SAGA' });
    offers && setFiletredData(offers[fiat]);
  }, []);

  const filter = (text) => {
    const filteredArray = offers[fiat]?.filter(
      (c) =>
        c?.pair?.baseCurrencyName.toLowerCase().includes(text.toLowerCase()) ||
        c?.pair?.baseCurrency.toLowerCase().includes(text.toLowerCase())
    );
    setFiletredData(filteredArray);
  };

  const hide = () => dispatch(toggleCryptoModal(false));
  const onModalHide = () => dispatch(fetchCurrencies());

  const choose = (code) => {
    dispatch(setCrypto(code));
    dispatch(filterCurrencies(filteredData));
    dispatch(instantTradeTabAction());
    hide();
  };
  const children = (
    <ModalWithSearch
      array={filteredData.length > 0 || offers[fiat]}
      choose={choose}
      filter={filter}
      currentItem={crypto}
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
        custom
      />
    )
  );
}
