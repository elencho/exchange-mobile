import React from 'react';
import { StyleSheet, Modal, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CalendarPicker from 'react-native-calendar-picker';

import {
  setFromTime,
  setToTime,
  toggleDatePicker,
} from '../../redux/transactions/actions';
import colors from '../../constants/colors';

export default function DatePickerModal({ from, to }) {
  const dispatch = useDispatch();
  const datePickerVisible = useSelector(
    (state) => state.transactions.datePickerVisible
  );

  const visible = () => {
    if (from) return datePickerVisible.from;
    if (to) return datePickerVisible.to;
  };

  const handleChange = (e) => {
    if (from) {
      dispatch(setFromTime(e.valueOf() - 3600000 * 12));
      dispatch(toggleDatePicker({ ...datePickerVisible, from: false }));
    }
    if (to) {
      dispatch(setToTime(e.valueOf() + 3600000 * 12 - 1));
      dispatch(toggleDatePicker({ ...datePickerVisible, to: false }));
    }
  };

  return (
    <Modal transparent animationType="fade" visible={visible()}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <CalendarPicker
            // width={Dimensions.get('window').width - 40}
            // minDate={new Date()}
            textStyle={styles.text}
            onDateChange={handleChange}
            startFromMonday
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(15, 15, 31, 0.9)',
  },
  modal: {
    backgroundColor: colors.PRIMARY_BACKGROUND,
    paddingVertical: 15,
  },
  text: { color: 'white' },
});
