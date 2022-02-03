import React, { memo, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import colors from '../../../constants/colors';
import images from '../../../constants/images';
import AppText from '../../AppText';

function AddressList() {
  const [address, setAddress] = useState(1);
  const chooseAddress = (a) => setAddress(a);

  return (
    <>
      {[1, 2, 3].map((a) => (
        <Pressable
          style={[
            styles.container,
            a === address && { backgroundColor: colors.SECONDARY_BACKGROUND },
          ]}
          onPress={() => chooseAddress(a)}
          key={a}
        >
          <View style={styles.qr}>
            <Image source={images.QR} />
          </View>

          <View style={styles.address}>
            <AppText subtext style={styles.secondary}>
              Feb 5, 2020 / 12:00:03
            </AppText>
            <AppText medium body style={styles.primary}>
              347hNv1vJ7gEGJ…AANyBLQNF
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
  },
  container: {
    paddingHorizontal: 35,
    paddingVertical: 20,
    flexDirection: 'row',
  },
  qr: {
    height: 33,
    width: 33,
  },
  primary: {
    color: colors.PRIMARY_TEXT,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
});
