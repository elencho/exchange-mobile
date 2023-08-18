import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Close from '../../assets/images/Close';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { toggleDatePicker } from '../../redux/modals/actions';
import CalendarIcon from '../../assets/images/Calendar';
import { setFromTime, setToTime } from '../../redux/transactions/actions';
import { setFromDateQuery, setToDAteQuery } from '../../redux/trade/actions';

export default function DatePicker({
  to = false,
  from = false,
  isInstantTrade,
}) {
  const dispatch = useDispatch();

  const {
    fromDateTime: fromDateTimeTransactions,
    toDateTime: toDateTimeTransactions,
  } = useSelector((state) => state.transactions);
  const {
    fromDateTimeQuery: fromDateTimeTrades,
    toDateTimeQuery: toDateTimeTrades,
  } = useSelector((state) => state.trade);

  const fromDateTime = isInstantTrade
    ? fromDateTimeTrades
    : fromDateTimeTransactions;
  const toDateTime = isInstantTrade ? toDateTimeTrades : toDateTimeTransactions;

  const text = () => {
    const fromDate = new Date(fromDateTime);
    const toDate = new Date(toDateTime);
    const formatDate = (date) =>
      date.toDateString().split(' ').slice(1).join(' ');

    if (from && fromDateTime) return formatDate(fromDate);
    if (to && toDateTime) return formatDate(toDate);
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

  const handleClear = () => {
    if (to)
      isInstantTrade
        ? dispatch(setToDAteQuery(null))
        : dispatch(setToTime(null));
    if (from)
      isInstantTrade
        ? dispatch(setFromDateQuery(null))
        : dispatch(setFromTime(null));
  };
  const shouldShowClear = to ? toDateTime : fromDateTime;

  return (
    <Pressable onPress={showDatePickerModal} style={styles.dropdown}>
      <AppText style={{ color: color() }}>{text()}</AppText>
      {shouldShowClear ? (
        <Pressable style={styles.close} onPress={handleClear}>
          <Close width={9} height={9} />
        </Pressable>
      ) : (
        <CalendarIcon />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    paddingHorizontal: 20,
    height: 44,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#42475D',
    marginBottom: 24,
  },
  close: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -15,
  },
});
