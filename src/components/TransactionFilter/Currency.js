import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../AppText';

import { currencyAction } from '../../redux/transactions/actions';
import { currencyList } from '../../constants/filters';
import colors from '../../constants/colors';

export default function Currency({ name, abbr }) {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.transactions.currency);

  const choose = () => {
    dispatch(
      currencyAction(
        name,
        currencyList,
        name === 'Show All Currency' ? null : abbr
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
      {abbr ? (
        <AppText medium style={styles.abbr}>
          {' '}
          ({abbr})
        </AppText>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  abbr: {
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
