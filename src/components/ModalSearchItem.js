import React, { memo } from 'react';
import { Pressable, StyleSheet, Image, View } from 'react-native';

import AppText from './AppText';
import ShowAll from '../assets/images/ShowAll';
import colors from '../constants/colors';
import { SvgUri } from 'react-native-svg';
import FastImage from 'react-native-fast-image';

const ModalSearchItem = ({
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
}) => {
  const backgroundCond = () => {
    if (name === currentItem || code === currentItem) {
      return styles.background;
    }
  };
  const codeText = phoneCountry ? phoneCode : code;
  const text =
    phoneCountry || countryDrop || citizenshipDrop ? (
      <View style={styles.codeWrapper}>
        <AppText body medium style={styles.primary}>
          ({codeText})
        </AppText>
        <AppText
          body
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
        <AppText body medium style={styles.primary}>
          {name}
        </AppText>
        <AppText body medium style={styles.secondary}>
          {!!canShowCode && ` (${code})`}
        </AppText>
      </View>
    );
  const altText = !!total && (
    <AppText body medium style={styles.secondary}>
      {total}
    </AppText>
  );

  return (
    <Pressable style={[styles.container, backgroundCond()]} onPress={onPress}>
      {code ? (
        <FastImage
          style={styles.image}
          source={{
            uri,
            priority: FastImage.priority.normal,
          }}
        />
      ) : (
        // <Image style={styles.image} source={{ uri }} />
        // <SvgUri
        //   style={styles.image}
        //   uri={'https://static.cryptal.com/icons/svg/countries/ECU.svg'}
        // />

        <ShowAll style={{ marginRight: 20 }} />
      )}
      <View>
        {text}
        {altText}
      </View>
    </Pressable>
  );
};
export default memo(ModalSearchItem);
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
