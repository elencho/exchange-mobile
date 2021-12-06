import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import colors from '../../constants/colors';
import { toggleInfoModal } from '../../redux/modals/actions';
import AppText from '../AppText';

export default function QuestionMark() {
  const dispatch = useDispatch();

  const showInfo = () => {
    dispatch(toggleInfoModal(true));
  };

  return (
    <TouchableOpacity style={styles.container} onPress={showInfo}>
      <AppText header style={styles.questionMark}>
        ?
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.SECONDARY_PURPLE,
    width: 25,
    height: 25,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  questionMark: {
    color: colors.SECONDARY_PURPLE,
  },
});
