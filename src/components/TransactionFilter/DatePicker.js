import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { toggleDatePicker } from '../../redux/transactions/actions';

export default function DatePicker({ to, from }) {
  const dispatch = useDispatch();

  const showDatePickerModal = () => {
    if (from) dispatch(toggleDatePicker({ from: true, to: false }));
    if (to) dispatch(toggleDatePicker({ from: false, to: true }));
  };

  return (
    <Pressable onPress={showDatePickerModal} style={styles.dropdown}>
      <AppText style={styles.text}>
        {to && 'To'}
        {from && 'From'} Date
      </AppText>
      <Image source={require('../../assets/images/Calendar.png')} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#42475D',
    marginBottom: 15,
  },

  text: {
    fontSize: 15,
    color: colors.SECONDARY_TEXT,
  },
});
