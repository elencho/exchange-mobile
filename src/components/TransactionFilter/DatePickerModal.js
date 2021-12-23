import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar } from 'react-native-calendars';

import { setFromTime, setToTime } from '../../redux/transactions/actions';
import { toggleDatePicker } from '../../redux/modals/actions';
import colors from '../../constants/colors';
import AppModal from '../AppModal';
import CalendarHeader from './CalendarHeader';
import CalendarDay from './CalendarDay';
import AppText from '../AppText';
import { months } from '../../constants/months';

const theme = {
  calendarBackground: colors.SECONDARY_BACKGROUND,
};

export default function DatePickerModal({ from, to }) {
  const dispatch = useDispatch();
  const datePickerVisible = useSelector(
    (state) => state.modals.datePickerVisible
  );
  const fromDateTime = useSelector((state) => state.transactions.fromDateTime);
  const toDateTime = useSelector((state) => state.transactions.toDateTime);

  const visible = () => {
    if (from) return datePickerVisible.from;
    if (to) return datePickerVisible.to;
  };

  const handleChange = (timestamp) => {
    if (from) {
      dispatch(setFromTime(timestamp - 3600000 * 4));
    }
    if (to) {
      dispatch(setToTime(timestamp + 3600000 * 20 - 1));
    }
  };

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

  const dateSubtext = () => {
    if (from) {
      return (
        <View style={styles.subtextContainer}>
          {fromDateTime && (
            <AppText style={styles.subtext} body>
              From Date Selected{'  '}
              <AppText medium body style={styles.date}>
                {new Date(fromDateTime).getDate()}{' '}
                {months[new Date(fromDateTime).getMonth()]}
              </AppText>
            </AppText>
          )}
        </View>
      );
    }
    if (to) {
      return (
        <View style={styles.subtextContainer}>
          {toDateTime && (
            <AppText style={styles.subtext} body>
              To Date Selected{'  '}
              <AppText medium body style={styles.date}>
                {new Date(toDateTime).getDate()}{' '}
                {months[new Date(toDateTime).getMonth()]}
              </AppText>
            </AppText>
          )}
        </View>
      );
    }
  };

  const hide = () => {
    dispatch(toggleDatePicker({ from: false, to: false }));
  };

  const minMaxDate = () => {
    if (fromDateTime && to) {
      const date = new Date(fromDateTime).toLocaleDateString().split('/');
      const day = date[1] < 10 ? `0${date[1]}` : date[1];
      const month = date[0] < 10 ? `0${date[0]}` : date[0];
      const year = date[2];
      return `${year}-${month}-${day}`;
    }
    if (toDateTime && from) {
      const date = new Date(toDateTime).toLocaleDateString().split('/');
      const day = date[1] < 10 ? `0${date[1]}` : date[1];
      const month = date[0] < 10 ? `0${date[0]}` : date[0];
      const year = date[2];
      return `${year}-${month}-${day}`;
    }
  };

  const children = (
    <Calendar
      style={styles.container}
      theme={theme}
      minDate={to && minMaxDate()}
      maxDate={from && minMaxDate()}
      customHeader={({ month, addMonth }) => (
        <CalendarHeader
          month={month}
          addMonth={addMonth}
          dateSubtext={dateSubtext}
        />
      )}
      dayComponent={(state) => (
        <CalendarDay
          state={state}
          handleChange={handleChange}
          dateMark={dateMark}
        />
      )}
    />
  );

  return (
    <AppModal children={children} bottom visible={visible()} hide={hide} />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -50,
    marginHorizontal: -15,
    marginBottom: -15,
  },
  date: {
    color: '#9096B5',
  },
  modal: {
    backgroundColor: colors.PRIMARY_BACKGROUND,
    paddingVertical: 15,
    flex: 1,
  },
  subtextContainer: {
    marginTop: 12,
    height: 25,
  },
  subtext: {
    color: colors.SECONDARY_TEXT,
    textAlign: 'center',
  },
  text: { color: colors.PRIMARY_TEXT },
});
