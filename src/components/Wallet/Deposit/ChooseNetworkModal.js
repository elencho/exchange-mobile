import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../../AppModal';
import { toggleChooseNetworkModal } from '../../../redux/modals/actions';
import AppText from '../../AppText';
import colors from '../../../constants/colors';
import images from '../../../constants/images';

export default function ChooseNetworkModal() {
  const dispatch = useDispatch();
  const chooseNetworkModalVisible = useSelector(
    (state) => state.modals.chooseNetworkModalVisible
  );

  const hide = () => {
    dispatch(toggleChooseNetworkModal(false));
  };

  const children = (
    <>
      {['Ethereum', 'Binace Smart Chain'].map((n, i) => (
        <Pressable
          style={[styles.network, i === 1 && { marginBottom: 0 }]}
          key={n}
          onPress={hide}
        >
          <Image
            source={images[n === 'Ethereum' ? 'ETH' : 'Binance']}
            style={styles.image}
          />
          <View style={styles.name}>
            <AppText medium body style={styles.primary}>
              {n}
            </AppText>
            <AppText subtext style={styles.secondary}>
              {n === 'Ethereum' ? 'ERC20' : 'BEP20'}
            </AppText>
          </View>
        </Pressable>
      ))}
    </>
  );

  return (
    <AppModal
      visible={chooseNetworkModalVisible}
      hide={hide}
      title="Choose Network"
      bottom
      children={children}
    />
  );
}

const styles = StyleSheet.create({
  image: { width: 37, height: 37 },
  name: {
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  network: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  primary: {
    color: colors.PRIMARY_TEXT,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
});
