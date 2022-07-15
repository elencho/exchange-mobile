import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppInput from '../../AppInput';
import AppText from '../../AppText';
import colors from '../../../constants/colors';
import images from '../../../constants/images';
import { toggleChooseAddressModal } from '../../../redux/modals/actions';
import ChooseAddressModal from './ChooseAddressModal';
import { chooseWhitelist } from '../../../redux/wallet/actions';

export default function WithdrawalAddress() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    wallet: { hasWhitelist, currentWhitelistObj },
  } = state;

  const chooseAddress = () => dispatch(toggleChooseAddressModal(true));
  const setAddress = (address) =>
    dispatch(chooseWhitelist({ ...currentWhitelistObj, address }));

  return (
    <>
      {hasWhitelist ? (
        <Pressable style={styles.dropdown} onPress={chooseAddress}>
          <AppText body style={styles.secondary}>
            {currentWhitelistObj.name
              ? currentWhitelistObj.name
              : 'Choose Address'}
          </AppText>

          <View style={styles.arrow}>
            <Image source={images.Arrow} />
          </View>

          <ChooseAddressModal />
        </Pressable>
      ) : (
        <AppInput
          label="Destination Address"
          labelBackgroundColor={colors.SECONDARY_BACKGROUND}
          style={styles.address}
          onChangeText={setAddress}
          value={currentWhitelistObj.address}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  arrow: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  address: {
    marginBottom: 22,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#3C4167',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
});
