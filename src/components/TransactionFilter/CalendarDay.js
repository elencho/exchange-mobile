import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import AppText from '../AppText';

export default function CalendarDay({ state, handleChange, dateMark }) {
  const {
    date: { day, timestamp },
  } = state;

  const from = useSelector((state) => state.transactions.fromDateTime);
  const to = useSelector((state) => state.transactions.toDateTime);

  const textColor =
    state.state === 'today'
      ? '#7B94FD'
      : state.state === 'disabled'
      ? '#4A5071'
      : '#C0C5E0';

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
    if (dateMark(new Date(timestamp), new Date(from), new Date(to))) {
      return {
        ...style,
        backgroundColor: '#6582FD',
      };
    }
  };

  const selectDate = () => handleChange(timestamp);

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
