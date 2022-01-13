import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../AppModal';
import ModalWithSearch from '../ModalWithSearch';

import { toggleCountriesModal } from '../../redux/modals/actions';
import {
  chooseCitizenship,
  chooseCountry,
  fetchCountries,
  saveCountries,
} from '../../redux/profile/actions';

export default function CountriesModal({
  countryDrop = false,
  citizenshipDrop = false,
  reset,
}) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const {
    modals: { countriesModalVisible },
    profile: { countries, countriesConstant, country, citizenship },
  } = state;

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  const filter = (text) => {
    const filteredArray = countriesConstant.filter((c) =>
      c.name.toLowerCase().includes(text.toLowerCase())
    );
    dispatch(saveCountries(filteredArray));
  };

  const hide = () => {
    dispatch(toggleCountriesModal(false));
    dispatch(saveCountries(countriesConstant));
    reset();
  };

  const currentItem = () => {
    if (countryDrop) {
      return country;
    }
    if (citizenshipDrop) {
      return citizenship;
    }
  };

  const choose = (country) => {
    if (countryDrop) {
      dispatch(chooseCountry(country));
    }
    if (citizenshipDrop) {
      dispatch(chooseCitizenship(country));
    }
    hide();
  };

  const children = (
    <ModalWithSearch
      array={countries}
      choose={choose}
      filter={filter}
      currentItem={currentItem()}
    />
  );

  return (
    <AppModal
      visible={countriesModalVisible}
      hide={hide}
      children={children}
      custom
    />
  );
}
