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
  notClearable,
  withLabel = false,
  error,
  disabled,
  hideArrow,
}) => {
  return (
    <Pressable
      style={[
        styles.container,
        style,
        error && { borderColor: colors.ERROR_TEXT },
      ]}
      onPress={!disabled ? handlePress : null}
    >
      {selectedText ? (
        <View style={styles.row}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <AppText
            medium
            body
            style={[styles.selectedText, error && { color: colors.ERROR_TEXT }]}
          >
            {selectedText}
          </AppText>
        </View>
      ) : activeLabel ? (
        <AppText medium body style={styles.selectedText}>
          {activeLabel}
        </AppText>
      ) : (
        <AppText
          medium
          body
          style={[
            styles.label,
            error && { color: colors.ERROR_TEXT },
            disabled && { color: 'rgba(105, 111, 142, 0.4)' },
          ]}
        >
          {label}
        </AppText>
      )}
      {withLabel && selectedText && (
        <AppText
          subtext
          style={[
            styles.withLabel,
            {
              backgroundColor: colors.PRIMARY_BACKGROUND,
            },
          ]}
        >
          {label}
        </AppText>
      )}

      <View>
        {selectedText && selectedText !== activeLabel && !notClearable ? (
          <Pressable style={styles.close} onPress={handleClear}>
            <Close width={9} height={9} />
          </Pressable>
        ) : !hideArrow ? (
          <Arrow />
        ) : null}
      </View>
    </Pressable>
  );
};

export default AppDropdown;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingHorizontal: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: colors.BORDER,
    height: 44,
  },
  label: {
    color: colors.SECONDARY_TEXT,
  },
  withLabel: {
    color: colors.SECONDARY_TEXT,
    position: 'absolute',
    left: 13,
    top: -9,
    paddingHorizontal: 8,
  },
  selectedText: {
    color: colors.PRIMARY_TEXT,
  },
  close: {
    width: 36,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
});
