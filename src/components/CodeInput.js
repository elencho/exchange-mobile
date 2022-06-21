import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useSelector } from 'react-redux';

import AppText from './AppText';
import colors from '../constants/colors';
import GeneralError from './GeneralError';

export default function CodeInput({ cellCount = 6, value, setValue }) {
  const generalError = useSelector((state) => state.profile.generalError);
  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <>
      {generalError ? (
        <View style={{ marginBottom: 25, marginTop: -10 }}>
          <GeneralError />
        </View>
      ) : null}

      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={cellCount}
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
    </>
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
  focusCell: {
    borderColor: colors.SECONDARY_PURPLE,
  },
});
