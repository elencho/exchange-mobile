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

let addr =
  'addr1qxyskt5fmj4dczqhfmkw2ljamtlnynpruv2l2susl4ylxyd2wvsvtpknan706f90cxvzuqs6cw9xs7487jnhn6hr6szqlq5c0k';

export default function WithdrawalAddress() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    wallet: { hasWhitelist, currentWhitelistObj },
  } = state;

  const w = currentWhitelistObj;
  const color = colors[w?.address ? 'PRIMARY_TEXT' : 'SECONDARY_TEXT'];

  const chooseAddress = () => dispatch(toggleChooseAddressModal(true));
  const setAddress = (address) => dispatch(chooseWhitelist({ ...w, address }));

  const AddressAndTag = () => {
    const { address, tag } = w;
    return (
      <View style={{ marginBottom: 10 }}>
        <View style={styles.flex}>
          <AppText subtext style={styles.subtext}>
            Address :
          </AppText>
          <AppText subtext medium style={styles.address}>
            {address}
          </AppText>
        </View>

        {tag && (
          <View style={[styles.flex, { marginTop: 10 }]}>
            <AppText subtext style={styles.subtext}>
              Address Tag :
            </AppText>
            <AppText subtext medium style={styles.address}>
              {tag}
            </AppText>
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      {hasWhitelist ? (
        <Pressable style={styles.dropdown} onPress={chooseAddress}>
          <AppText body style={{ color }}>
            {w.name ? w.name : 'Choose Address'}
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
          style={{ marginBottom: 22 }}
          onChangeText={setAddress}
          value={w.address}
        />
      )}

      {w?.id && <AddressAndTag />}
    </>
  );
}

const styles = StyleSheet.create({
  arrow: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  address: {
    color: '#B7BFDB',
    flex: 1,
    marginTop: -1,
    lineHeight: 16,
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
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subtext: {
    color: colors.SECONDARY_TEXT,
    width: '25%',
  },
});
