import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../AppText';

import { currencyAction } from '../../redux/transactions/actions';
import colors from '../../constants/colors';

export default function Currency({ name, code }) {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.transactions.currency);
  const currencies = useSelector((state) => state.transactions.currencies);

  console.log(currency);

  const choose = () => {
    dispatch(
      currencyAction(
        name,
        currencies,
        name === 'Show All Currency' ? null : code
      )
    );
  };

  const backgroundCond = () => {
    if (name === currency) {
      return { backgroundColor: 'rgba(101, 130, 253, 0.1 )' };
    }
  };

  return (
    <Pressable style={[styles.container, backgroundCond()]} onPress={choose}>
      <Image
        source={require('../../assets/images/Currencies/BTC.png')}
        style={styles.image}
      />
      <AppText medium style={styles.name}>
        {name}
      </AppText>
      {code ? (
        <AppText medium style={styles.code}>
          {' '}
          ({code})
        </AppText>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  code: {
    fontSize: 15,
    color: colors.SECONDARY_TEXT,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 5,
    paddingVertical: 10,
  },
  image: {
    marginHorizontal: 10,
  },
  name: {
    fontSize: 15,
    color: colors.PRIMARY_TEXT,
  },
});
