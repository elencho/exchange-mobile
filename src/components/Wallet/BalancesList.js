import React from 'react';
import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native';

import colors from '../../constants/colors';
import images from '../../constants/images';
import AppText from '../AppText';
import Currency from './Currency';

export default function BalancesList() {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image source={images.Search} />
        <TextInput
          placeholder="Search Coin"
          placeholderTextColor="rgba(105, 111, 142, 0.5)"
          style={styles.input}
          //   onChangeText={filter}
        />
      </View>

      <View style={styles.hide}>
        <Pressable style={styles.radio}>
          <View style={styles.selected} />
        </Pressable>
        <AppText body style={styles.secondary}>
          Hide Zero Balances
        </AppText>
      </View>

      <Currency />
      <Currency />
      <Currency />
      <Currency />
      <Currency />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: colors.SECONDARY_BACKGROUND,
    marginVertical: 10,
  },
  hide: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    height: 45,
    borderWidth: 1,
    borderColor: '#3C4167',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: '100%',
    fontSize: 15,
    color: colors.PRIMARY_TEXT,
    flex: 1,
    marginLeft: 10,
  },
  radio: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: colors.SECONDARY_TEXT,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 0.75 }],
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    marginLeft: 20,
  },
  selected: {
    backgroundColor: colors.SECONDARY_TEXT,
    borderRadius: 20,
    width: '75%',
    height: '75%',
  },
});
