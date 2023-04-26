import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'i18next';

import AppInput from '../../AppInput';
import AppText from '../../AppText';
import PurpleText from '../../PurpleText';
import ChooseAddressModal from './ChooseAddressModal';

import colors from '../../../constants/colors';
import { toggleChooseAddressModal } from '../../../redux/modals/actions';
import { chooseWhitelist, setWalletTab } from '../../../redux/wallet/actions';

import Arrow from '../../../assets/images/Arrow';

export default function WithdrawalAddress({ error, right }) {
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
      <View style={styles.mb10}>
        <View style={styles.flex}>
          <AppText subtext style={styles.subtext}>
            Address :
          </AppText>
          <AppText subtext medium style={styles.address}>
            {address}
          </AppText>
        </View>

        {tag && (
          <View style={[styles.flex, styles.mt10]}>
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
            <AppInput
              label="Destination Address"
              labelBackgroundColor={colors.SECONDARY_BACKGROUND}
              onChangeText={setAddress}
              value={w.address}
              error={error && !w?.address}
              right={right ? right : null}
            />
            <AppText subtext style={styles.addWhitelist}>
              {t('Do Not Have Address')}{' '}
              <PurpleText text={t('Add Whitelist')} onPress={whitelistTab} />
            </AppText>
          </>
        );
      }
    } else {
      return (
        <AppInput
          label="Destination Address"
          labelBackgroundColor={colors.SECONDARY_BACKGROUND}
          style={styles.mb22}
          onChangeText={setAddress}
          value={w.address}
          error={error && !w?.address}
          right={right ? right : null}
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
        <Arrow />
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
  mt10: {
    marginTop: 10,
  },
  mb10: {
    marginBottom: 10,
  },
  mb22: {
    marginBottom: 22,
  },
});
