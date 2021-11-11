import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import AppText from '../AppText';

import {
  chooseCurrency,
  toggleCurrencyModal,
} from '../../redux/transactions/actions';

export default function Currency({ name, abbr }) {
  const dispatch = useDispatch();

  const choose = () => {
    dispatch(chooseCurrency(name));
    dispatch(toggleCurrencyModal(false));
  };

  return (
    <Pressable style={styles.container} onPress={choose}>
      <Image
        source={require('../../assets/images/Currencies/BTC.png')}
        style={styles.image}
      />
      <AppText medium style={styles.name}>
        {name}
      </AppText>
      {abbr ? (
        <AppText medium style={styles.abbr}>
          {' '}
          {`(${abbr})`}
        </AppText>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  abbr: {
    fontSize: 15,
    color: '#696F8E',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    marginHorizontal: 10,
  },
  name: {
    fontSize: 15,
    color: 'white',
  },
});
