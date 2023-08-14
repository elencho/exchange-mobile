import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { setFromTime, setToTime } from '../../redux/transactions/actions';
import { toggleDatePicker } from '../../redux/modals/actions';
import { setFromDateQuery, setToDAteQuery } from '../../redux/trade/actions';

export default function CalendarDay({ state, from, to, isInstantTrade }) {
  const {
    date: { day, month, year, timestamp },
  } = state;

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

  const disabled = () => {
    const now = Date.now();
    const future = timestamp > now;
    if (future) return true;
    if (fromDateTime && to) {
      return future || timestamp < fromDateTime;
    }
    if (toDateTime && from) {
      return future || timestamp > toDateTime;
    }
  };

  const textColor =
    state.state === 'today' ? '#7B94FD' : disabled() ? '#4A5071' : '#C0C5E0';

  const dateMark = (timestamp, fromDate, toDate) => {
    if (from) {
      return (
        fromDate.getDate() === timestamp.getDate() &&
        fromDate.getFullYear() === timestamp.getFullYear() &&
        fromDate.getMonth() === timestamp.getMonth()
      );
    }
    if (to) {
      return (
        toDate.getDate() === timestamp.getDate() &&
        toDate.getFullYear() === timestamp.getFullYear() &&
        toDate.getMonth() === timestamp.getMonth()
      );
    }
  };

  const mark = () => {
    const style = {
      width: 45,
      height: 45,
      position: 'absolute',
      top: -10,
      borderRadius: 25,
    };

    if (state.state === 'today') {
      return {
        ...style,
        backgroundColor: 'rgba(101, 130, 253, 0.1)',
      };
    }
    if (
      dateMark(
        new Date(timestamp),
        new Date(fromDateTime),
        new Date(toDateTime)
      )
    ) {
      return {
        ...style,
        backgroundColor: colors.SECONDARY_PURPLE,
      };
    }
  };

  const todayDisabled = () => {
    const now = Date.now();
    const condition =
      (to && now < parseInt(fromDateTime)) ||
      (from && parseInt(toDateTime) < now);
    return !!condition;
  };

  const handleChange = (timestamp) => {
    const fromValue = timestamp - 3600000 * 4;
    const toValue = timestamp + 3600000 * 20 - 1;
    if (from) {
      dispatch(
        isInstantTrade ? setFromDateQuery(fromValue) : setFromTime(fromValue)
      );
    }
    if (to) {
      dispatch(isInstantTrade ? setToDAteQuery(toValue) : setToTime(toValue));
    }
  };

  const selectDate = () => {
    const date = new Date(Date.now());
    const isToday =
      date.getMonth() + 1 === month &&
      date.getDate() === day &&
      date.getFullYear() === year;

    if ((todayDisabled() && isToday) || disabled()) return false;
    else handleChange(timestamp);
    dispatch(toggleDatePicker({ from: false, to: false }));
  };

  return (
    <TouchableOpacity onPress={selectDate} style={[styles.container, mark()]}>
      <AppText style={{ color: textColor }} medium calendarDay>
        {day}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
