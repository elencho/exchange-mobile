import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../AppModal';
import ModalWithSearch from '../ModalWithSearch';
import { toggleCryptoModal } from '../../redux/modals/actions';
import {
  fetchTrades,
  instantTradeTabAction,
  setCryptoCodeQuery,
} from '../../redux/trade/actions';

export default function CryptoModalTrade() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const {
    modals: { cryptoModalVisible },
    trade: { cryptoCodeQuery, offers, fiat, tradeType },
  } = state;

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
    dispatch(setCryptoCodeQuery(code));
    dispatch(fetchTrades());
    hide();
  };

  const children = (
    <ModalWithSearch
      array={arrayToPass}
      choose={choose}
      filter={filter}
      currentItem={cryptoCodeQuery}
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
