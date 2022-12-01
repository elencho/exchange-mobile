import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../AppModal';
import ModalWithSearch from '../ModalWithSearch';

import {
  fetchCurrencies,
  filterCurrencies,
} from '../../redux/transactions/actions';
import { toggleCryptoModal } from '../../redux/modals/actions';
import {
  instantTradeTabAction,
  setCrypto,
  setCryptosArray,
} from '../../redux/trade/actions';

export default function CryptoModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const {
    modals: { cryptoModalVisible },
    trade: { crypto, cryptosArray, cryptosArrayConstant },
  } = state;

  const filter = (text) => {
    const filteredArray = cryptosArrayConstant.filter(
      (c) =>
        c.name.toLowerCase().includes(text.toLowerCase()) ||
        c.code.toLowerCase().includes(text.toLowerCase())
    );
    dispatch(setCryptosArray(filteredArray));
  };

  const hide = () => dispatch(toggleCryptoModal(false));
  const onModalHide = () => dispatch(fetchCurrencies());

  const choose = (code) => {
    dispatch(setCrypto(code));
    dispatch(filterCurrencies(cryptosArray));
    dispatch(instantTradeTabAction());
    hide();
  };

  const children = (
    <ModalWithSearch
      array={cryptosArray}
      choose={choose}
      filter={filter}
      currentItem={crypto}
      crypto
      title="Choose Currency"
    />
  );

  return (
    <AppModal
      visible={cryptoModalVisible}
      hide={hide}
      children={children}
      onModalHide={onModalHide}
      custom
    />
  );
}
