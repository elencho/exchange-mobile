import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import { modalTopAction } from '../redux/transactions/actions';
import colors from '../constants/colors';

export default function ModalTop() {
  const dispatch = useDispatch();

  const closeModal = (evt) => {
    const { nativeEvent } = evt;
    if (nativeEvent.y > 150) {
      dispatch(modalTopAction());
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
    height: 10,
    width: '25%',
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
  top: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 15, 31, 1)',
  },
});
