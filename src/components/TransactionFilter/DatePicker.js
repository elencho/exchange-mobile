import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { toggleDatePicker } from '../../redux/modals/actions';
import CalendarIcon from '../../assets/images/Calendar';

export default function DatePicker({ to = false, from = false }) {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.transactions);
  const { fromDateTime, toDateTime } = state;

  const text = () => {
    const fromDate = new Date(fromDateTime);
    const toDate = new Date(toDateTime);
    if (from && fromDateTime) return fromDate.toDateString();
    if (to && toDateTime) return toDate.toDateString();
    if (from && !fromDateTime) return 'From Date';
    if (to && !toDateTime) return 'To Date';
  };

  const color = () => {
    if ((from && fromDateTime) || (to && toDateTime))
      return colors.PRIMARY_TEXT;
    if ((from && !fromDateTime) || (to && !toDateTime))
      return colors.SECONDARY_TEXT;
  };

  const showDatePickerModal = () => {
    if (from) dispatch(toggleDatePicker({ from: true, to: false }));
    if (to) dispatch(toggleDatePicker({ from: false, to: true }));
  };

  return (
    <Pressable onPress={showDatePickerModal} style={styles.dropdown}>
      <AppText style={{ color: color() }}>{text()}</AppText>
      <CalendarIcon />
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
});
