import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../AppModal';
import ModalWithSearch from '../ModalWithSearch';

import {
  currencyAction,
  fetchCurrencies,
  filterCurrencies,
} from '../../redux/transactions/actions';
import { toggleCurrencyModal } from '../../redux/modals/actions';

export default function ChooseCurrencyModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.transactions);
  const chooseCurrencyModalVisible = useSelector(
    (state) => state.modals.chooseCurrencyModalVisible
  );

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  const { currencies, currenciesConstant, currency } = state;

  const filter = (text) => {
    const filteredArray = currenciesConstant.filter((c) =>
      c.name.toLowerCase().includes(text.toLowerCase())
    );
    dispatch(filterCurrencies(filteredArray));
  };

  const hide = () => {
    dispatch(toggleCurrencyModal(false));
  };

  const choose = (name, code) => {
    dispatch(
      currencyAction(
        name,
        currenciesConstant,
        name === 'Show All Currency' ? null : code
      )
    );
    hide();
  };

  const children = (
    <ModalWithSearch
      array={currencies}
      choose={choose}
      filter={filter}
      currentItem={currency}
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
