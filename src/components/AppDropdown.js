import { StyleSheet, Pressable, View } from 'react-native';
import React from 'react';
import AppText from './AppText';
import Arrow from '../assets/images/Arrow';
import colors from '../constants/colors';
import Close from '../assets/images/Close';

const AppDropdown = ({
  label,
  handlePress,
  handleClear,
  selectedText,
  style,
  icon,
  activeLabel,
}) => {
  return (
    <Pressable style={[styles.container, style]} onPress={handlePress}>
      {selectedText ? (
        <View style={styles.row}>
          {icon}
          <AppText medium body style={styles.selectedText}>
            {selectedText}
          </AppText>
        </View>
      ) : activeLabel ? (
        <AppText medium body style={styles.selectedText}>
          {activeLabel}
        </AppText>
      ) : (
        <AppText medium body style={styles.label}>
          {label}
        </AppText>
      )}

      <View>
        {selectedText && selectedText !== activeLabel ? (
          <Pressable style={styles.close} onPress={handleClear}>
            <Close width={9} height={9} />
          </Pressable>
        ) : (
          <Arrow />
        )}
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
  close: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
