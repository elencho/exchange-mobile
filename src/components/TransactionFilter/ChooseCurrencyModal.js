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
import {
  cryptoAddressesAction,
  wireDepositAction,
} from '../../redux/wallet/actions';
import { withNavigation } from 'react-navigation';

function ChooseCurrencyModal({ wallet = false, navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  const {
    transactions: { currencies, currenciesConstant, currency },
    modals: { chooseCurrencyModalVisible },
    wallet: { network },
  } = state;

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
    if (wallet) {
      if (code === 'GEL' || code === 'USD') {
        dispatch(wireDepositAction(name, code, navigation));
      } else {
        dispatch(cryptoAddressesAction(name, code, navigation, network));
      }
    } else {
      dispatch(
        currencyAction(
          name,
          currenciesConstant,
          name === 'Show All Currency' ? null : code
        )
      );
    }

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

export default withNavigation(ChooseCurrencyModal);
