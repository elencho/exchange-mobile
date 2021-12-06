import React from 'react';
import { StyleSheet, Modal, View, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CalendarPicker from 'react-native-calendar-picker';

import { setFromTime, setToTime } from '../../redux/transactions/actions';
import { toggleDatePicker } from '../../redux/modals/actions';
import colors from '../../constants/colors';

export default function DatePickerModal({ from, to }) {
  const dispatch = useDispatch();
  const datePickerVisible = useSelector(
    (state) => state.modals.datePickerVisible
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

  const dismiss = () => {
    dispatch(toggleDatePicker({ from: false, to: false }));
  };

  return (
    <Modal transparent animationType="fade" visible={visible()}>
      <View style={styles.container}>
        <Pressable onPress={dismiss} style={styles.dismissZone} />
        <View style={styles.modal}>
          <CalendarPicker
            textStyle={styles.text}
            onDateChange={handleChange}
            startFromMonday
          />
        </View>
        <Pressable onPress={dismiss} style={styles.dismissZone} />
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
  dismissZone: {
    flex: 1,
  },
  modal: {
    backgroundColor: colors.PRIMARY_BACKGROUND,
    paddingVertical: 15,
    flex: 1,
  },
  text: { color: 'white' },
});
