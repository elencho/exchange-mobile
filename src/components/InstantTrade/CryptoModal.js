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

  const [filteredData, setFiletredData] = useState(offers?.[fiat]);
  const arrayToPass = filteredData?.length > 0 ? filteredData : offers?.[fiat];

  useEffect(() => {
    dispatch(instantTradeTabAction());
    offers && setFiletredData(offers[fiat]);
  }, []);

  useEffect(() => {
    filter('');
  }, [cryptoModalVisible]);

  const filter = (text) => {
    const filteredArray = offers[fiat]?.filter(
      (c) =>
        c?.pair?.baseCurrencyName.toLowerCase().includes(text.toLowerCase()) ||
        c?.pair?.baseCurrency.toLowerCase().includes(text.toLowerCase())
    );
    setFiletredData(filteredArray);
  };

  const hide = () => dispatch(toggleCryptoModal(false));
  const onModalHide = () => dispatch(instantTradeTabAction());

  const choose = (code) => {
    dispatch(setCrypto(code));
    dispatch(filterCurrencies(filteredData));
    dispatch(instantTradeTabAction());
    hide();
  };
  const children = (
    <ModalWithSearch
      array={arrayToPass}
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
        fullScreen
      />
    )
  );
}
