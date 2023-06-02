import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useDispatch } from 'react-redux';

import AppText from './AppText';
import colors from '../constants/colors';
import GeneralError from './GeneralError';
import { errorHappenedHere } from '../utils/appUtils';

export default function CodeInput({ cellCount = 6, value, setValue }) {
  const dispatch = useDispatch();
  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleValue = (value) => {
    setValue(value);
    dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null });
  };

  return (
    <>
      <View>
        <GeneralError
          style={styles.error}
          show={errorHappenedHere('CodeInput')}
        />
      </View>

      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={handleValue}
        caretHidden={false}
        cellCount={cellCount}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <AppText
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
            header
            isForCodeInput
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
    borderWidth: 1,
    borderColor: '#42475D',
    color: colors.PRIMARY_TEXT,
    marginHorizontal: 5,
    justifyContent: 'center',
    textAlign: 'center',
    paddingVertical: 10,
  },
  error: {
    marginBottom: 25,
    marginTop: -10,
  },
  focusCell: {
    borderColor: colors.SECONDARY_PURPLE,
  },
});
