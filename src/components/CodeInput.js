import React from 'react';
import { StyleSheet } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import AppText from './AppText';
import colors from '../constants/colors';

export default function CodeInput({ cellCount, value, setValue }) {
  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={setValue}
      cellCount={cellCount}
      //   rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => (
        <AppText
          key={index}
          style={[styles.cell, isFocused && styles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}
          header
        >
          {symbol || (isFocused ? <Cursor /> : null)}
        </AppText>
      )}
    />
  );
}

const styles = StyleSheet.create({
  cell: {
    width: 40,
    height: 45,
    borderRadius: 5,
    lineHeight: 38,
    borderWidth: 1,
    borderColor: '#42475D',
    textAlign: 'center',
    color: colors.PRIMARY_TEXT,
    marginHorizontal: 5,
  },
  codeFieldRoot: {
    marginVertical: 40,
  },
  focusCell: {
    borderColor: colors.SECONDARY_PURPLE,
  },
});
