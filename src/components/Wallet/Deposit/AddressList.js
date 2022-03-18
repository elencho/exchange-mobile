import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import colors from '../../../constants/colors';
import images from '../../../constants/images';
import AppText from '../../AppText';

function AddressList({ cryptoAddresses, address, setAddress }) {
  const chooseAddress = (a) => setAddress(a);

  return (
    <>
      {cryptoAddresses.map((a) => (
        <Pressable
          style={[
            styles.container,
            a.address === address && {
              backgroundColor: colors.SECONDARY_BACKGROUND,
            },
          ]}
          onPress={() => chooseAddress(a.address)}
          key={a.address}
        >
          <View style={styles.qr}>
            <Image source={images.QR} />
          </View>

          <View style={styles.address}>
            <AppText subtext style={styles.secondary}>
              {a.timestamp}
            </AppText>
            <AppText medium body numberOfLines={2} style={styles.primary}>
              {a.address}
            </AppText>
          </View>
        </Pressable>
      ))}
    </>
  );
}

export default memo(AddressList);

const styles = StyleSheet.create({
  address: {
    justifyContent: 'space-between',
    marginLeft: 20,
    flex: 1,
  },
  container: {
    paddingHorizontal: 35,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  qr: {
    height: 33,
    width: 33,
  },
  primary: {
    color: colors.PRIMARY_TEXT,
    marginTop: 5,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
});
