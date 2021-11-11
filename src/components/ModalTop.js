import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import {
  filterCurrencies,
  toggleCurrencyModal,
  toggleTransactionModal,
} from '../redux/transactions/actions';
import { currencyList } from '../constants/filters';

export default function ModalTop() {
  const dispatch = useDispatch();

  const closeModal = (evt) => {
    const { nativeEvent } = evt;
    if (nativeEvent.y > 150) {
      dispatch(toggleCurrencyModal(false));
      dispatch(toggleTransactionModal(false));
      dispatch(filterCurrencies(currencyList));
    }
  };

  return (
    <PanGestureHandler onGestureEvent={closeModal}>
      <View style={styles.top}>
        <View style={styles.line} />
      </View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  line: {
    height: 7,
    width: '25%',
    backgroundColor: '#1F1F35',
  },
  top: {
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 15, 31, 1)',
  },
});
