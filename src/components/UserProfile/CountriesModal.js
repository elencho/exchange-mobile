import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../AppModal';
import ModalWithSearch from '../ModalWithSearch';

import { toggleCountriesModal } from '../../redux/modals/actions';
import {
  fetchCountries,
  saveCountries,
  saveUserInfo,
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
    profile: { countries, countriesConstant, userInfo },
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
      return userInfo.country;
    }
    if (citizenshipDrop) {
      return userInfo.citizenship;
    }
  };

  const choose = (country) => {
    const code = (country) => {
      let code;
      countriesConstant.forEach((c) => {
        if (c.name === country) {
          code = c.code;
        }
      });
      return code;
    };

    if (countryDrop) {
      dispatch(
        saveUserInfo({ ...userInfo, country, countryCode: code(country) })
      );
    }
    if (citizenshipDrop) {
      dispatch(saveUserInfo({ ...userInfo, citizenship: code(country) }));
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
