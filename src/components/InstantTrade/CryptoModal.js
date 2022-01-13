import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../AppModal';
import ModalWithSearch from '../ModalWithSearch';

import {
  fetchCurrencies,
  filterCurrencies,
} from '../../redux/transactions/actions';
import { toggleCryptoModal } from '../../redux/modals/actions';
import { fetchOffers, setCrypto } from '../../redux/trade/actions';

export default function CryptoModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  const {
    transactions: { currencies, currenciesConstant },
    modals: { cryptoModalVisible },
    trade: { crypto },
  } = state;

  const currenciesToIterate = currencies.filter(
    (c) => c.code !== '' && c.code !== 'GEL' && c.code !== 'USD'
  );
  const updatedConstants = currenciesConstant.filter(
    (c) => c.code !== '' && c.code !== 'GEL' && c.code !== 'USD'
  );

  const filter = (text) => {
    const filteredArray = updatedConstants.filter((c) =>
      c.name.toLowerCase().includes(text.toLowerCase())
    );
    dispatch(filterCurrencies(filteredArray));
  };

  const hide = () => {
    dispatch(toggleCryptoModal(false));
  };

  const choose = (code) => {
    dispatch(setCrypto(code));
    dispatch(filterCurrencies(updatedConstants));
    dispatch(fetchOffers());
    hide();
  };

  const children = (
    <ModalWithSearch
      array={currenciesToIterate}
      choose={choose}
      filter={filter}
      currentItem={crypto}
      crypto
    />
  );

  return (
    <AppModal
      visible={cryptoModalVisible}
      hide={hide}
      children={children}
      custom
    />
  );
}
