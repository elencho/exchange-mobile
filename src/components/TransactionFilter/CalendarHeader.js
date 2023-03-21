import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import AppText from '../AppText';
import { months } from '../../constants/months';
import colors from '../../constants/colors';

import Left from '../../assets/images/Left';
import Right from '../../assets/images/Right';

export default function CalendarHeader({ addMonth, month, dateSubtext }) {
  const date = new Date(month);
  const curMonth = months[date.getMonth()];
  const year = date.getFullYear();

  const minus = () => addMonth(-1);
  const plus = () => addMonth(1);

  return (
    <>
      <View style={styles.month_year}>
        <Pressable onPress={minus} style={styles.arrow}>
          <Left />
        </Pressable>
        <AppText header style={styles.header}>
          {curMonth}, {year}
        </AppText>
        <Pressable onPress={plus} style={styles.arrow}>
          <Right />
        </Pressable>
      </View>

      {dateSubtext()}

      <View style={styles.weekdays}>
        <AppText style={styles.day} subtext medium>
          SU
        </AppText>
        <AppText style={styles.day} subtext medium>
          MO
        </AppText>
        <AppText style={styles.day} subtext medium>
          TU
        </AppText>
        <AppText style={styles.day} subtext medium>
          WE
        </AppText>
        <AppText style={styles.day} subtext medium>
          TH
        </AppText>
        <AppText style={styles.day} subtext medium>
          FR
        </AppText>
        <AppText style={styles.day} subtext medium>
          SA
        </AppText>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  arrow: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  day: {
    color: '#9096B5',
    flex: 1,
    textAlign: 'center',
  },
  month_year: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: colors.PRIMARY_TEXT,
    marginHorizontal: 20,
  },
  weekdays: {
    flexDirection: 'row',
    marginTop: 25,
    marginBottom: 20,
  },
});
