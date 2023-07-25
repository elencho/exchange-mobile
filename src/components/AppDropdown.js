import { StyleSheet, Pressable, View } from 'react-native';
import React from 'react';
import AppText from './AppText';
import Arrow from '../assets/images/Arrow';
import colors from '../constants/colors';

const AppDropdown = ({ label, handlePress, selectedText }) => {
  return (
    <Pressable style={styles.container} onPress={handlePress}>
      {selectedText ? (
        <AppText medium body style={styles.selectedText}>
          {selectedText}
        </AppText>
      ) : (
        <AppText medium body style={styles.label}>
          {label}
        </AppText>
      )}

      <View style={styles.arrow}>
        <Arrow />
      </View>
    </Pressable>
  );
};

export default AppDropdown;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: colors.BORDER,
    height: 44,
  },
  label: {
    color: colors.SECONDARY_TEXT,
  },
  selectedText: { color: colors.PRIMARY_TEXT },
});
