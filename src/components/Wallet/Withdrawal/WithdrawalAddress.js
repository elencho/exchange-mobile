import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Trans } from 'react-i18next';
import { t } from 'i18next';

import AppInput from '../../AppInput';
import AppText from '../../AppText';
import PurpleText from '../../PurpleText';
import ChooseAddressModal from './ChooseAddressModal';

import colors from '../../../constants/colors';
import images from '../../../constants/images';
import { toggleChooseAddressModal } from '../../../redux/modals/actions';
import { chooseWhitelist, setWalletTab } from '../../../redux/wallet/actions';

let addr =
  'addr1qxyskt5fmj4dczqhfmkw2ljamtlnynpruv2l2susl4ylxyd2wvsvtpknan706f90cxvzuqs6cw9xs7487jnhn6hr6szqlq5c0k';

export default function WithdrawalAddress({ error }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    wallet: { hasWhitelist, currentWhitelistObj, whitelist, network },
  } = state;

  const hasOnThisNetwork = whitelist.some((w) => w.provider === network);
  const w = currentWhitelistObj;
  const color =
    error && !w?.address
      ? '#F45E8C'
      : colors[w?.address ? 'PRIMARY_TEXT' : 'SECONDARY_TEXT'];
  const borderColor = error && !w?.address ? '#F45E8C' : '#3C4167';

  const chooseAddress = () => dispatch(toggleChooseAddressModal(true));
  const setAddress = (address) => dispatch(chooseWhitelist({ ...w, address }));
  const whitelistTab = () => dispatch(setWalletTab('Whitelist'));

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

  const address = () => {
    if (hasWhitelist) {
      if (hasOnThisNetwork) {
        return <AddressDropdown />;
      } else {
        return (
          <>
            <View style={styles.disabled}>
              <AppText style={{ color: colors.SECONDARY_TEXT }}>
                Destination Address
              </AppText>
            </View>
            <AppText subtext style={styles.addWhitelist}>
              <Trans
                i18nKey="do not have address whitelist"
                components={{
                  purple: (
                    <PurpleText
                      text={t('Add Whitelist')}
                      subtext
                      onPress={whitelistTab}
                    />
                  ),
                }}
              />
            </AppText>
          </>
        );
      }
    } else {
      return (
        <AppInput
          label="Destination Address"
          labelBackgroundColor={colors.SECONDARY_BACKGROUND}
          style={{ marginBottom: 22 }}
          onChangeText={setAddress}
          value={w.address}
          error={error && !w?.address}
        />
      );
    }
  };

  const AddressDropdown = () => (
    <Pressable
      style={[styles.dropdown, { borderColor }]}
      onPress={chooseAddress}
    >
      <AppText medium body style={{ color }}>
        {w.name ? w.name : 'Choose Address'}
      </AppText>

      <View style={styles.arrow}>
        <Image source={images.Arrow} />
      </View>

      <ChooseAddressModal />
    </Pressable>
  );

  return (
    <>
      {address()}
      {w?.id && <AddressAndTag />}
    </>
  );
}

const styles = StyleSheet.create({
  addWhitelist: {
    color: colors.SECONDARY_TEXT,
    marginTop: 8,
    marginBottom: 14,
  },
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
  disabled: {
    height: 44,
    borderWidth: 1,
    borderColor: '#42475D',
    justifyContent: 'center',
    paddingHorizontal: 22,
    opacity: 0.5,
  },
  dropdown: {
    borderWidth: 1,
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
