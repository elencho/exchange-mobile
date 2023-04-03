import React from 'react';
import {
  Pressable,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

import AppText from './AppText';
import ShowAll from '../assets/images/ShowAll';
import colors from '../constants/colors';
//import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ModalSearchItem({
  name,
  code,
  onPress,
  currentItem,
  uri,
  phoneCountry,
  phoneCode,
  countryDrop,
  citizenshipDrop,
  total,
  canShowCode,
}) {
  const backgroundCond = () => {
    if (name === currentItem || code === currentItem) {
      return styles.background;
    }
  };
  const codeText = phoneCountry ? phoneCode : code;
  const text =
    phoneCountry || countryDrop || citizenshipDrop ? (
      <View style={styles.codeWrapper}>
        <AppText medium style={styles.primary}>
          ({codeText})
        </AppText>
        <AppText
          medium
          numberOfLines={1}
          style={[styles.secondary, { flex: 1 }]}
        >
          {' '}
          {name}
        </AppText>
      </View>
    ) : (
      <View style={styles.row}>
        <AppText medium style={styles.primary}>
          {name}
        </AppText>
        <AppText medium style={styles.secondary}>
          {!!canShowCode && ` (${code})`}
        </AppText>
      </View>
    );
  const altText = !!total && (
    <AppText medium style={styles.secondary}>
      {total}
    </AppText>
  );

  return (
    <TouchableOpacity
      style={[styles.container, backgroundCond()]}
      onPress={onPress}
    >
      {code ? (
        <Image style={styles.image} source={{ uri }} />
      ) : (
        <ShowAll style={{ marginRight: 20 }} />
      )}
      <View>
        {text}
        {altText}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  background: { backgroundColor: 'rgba(101, 130, 253, 0.1 )' },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginHorizontal: 22,
  },
  image: {
    marginRight: 20,
    width: 36,
    height: 36,
  },
  primary: { color: colors.PRIMARY_TEXT },
  secondary: { color: colors.SECONDARY_TEXT },
  codeWrapper: {
    flexDirection: 'row',
    width: 500,
  },
  row: { flexDirection: 'row' },
});
