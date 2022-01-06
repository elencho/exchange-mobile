import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { switchPersonalSecurity } from '../../redux/profile/actions';

export default function PersonalSecuritySwitcher() {
  const dispatch = useDispatch();
  const Personal_Security = useSelector(
    (state) => state.profile.Personal_Security
  );

  const handleSwitch = (filter) => {
    dispatch(switchPersonalSecurity(filter));
  };

  const stylesCond = (p) => {
    if (p === Personal_Security) {
      return styles.active;
    } else {
      return styles.inactive;
    }
  };

  const textCond = (f) => {
    const isActive = f === Personal_Security;
    return (
      <AppText
        body
        style={{ color: isActive ? colors.PRIMARY_TEXT : '#C0C5E0' }}
      >
        {f}
      </AppText>
    );
  };

  return (
    <View style={styles.filterRow}>
      {['Personal', 'Security'].map((p) => (
        <Pressable
          style={[styles.button, stylesCond(p)]}
          onPress={() => handleSwitch(p)}
          key={p}
        >
          {textCond(p)}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: colors.PRIMARY_PURPLE,
  },
  inactive: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 40,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
    color: colors.SECONDARY_TEXT,
    textTransform: 'capitalize',
  },
});
