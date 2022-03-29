import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../../AppModal';
import AppText from '../../AppText';
import colors from '../../../constants/colors';
import { toggleChooseAddressModal } from '../../../redux/modals/actions';
import { chooseWhitelist } from '../../../redux/wallet/actions';

export default function ChooseAddressModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { chooseAddressModalVisible },
    wallet: { whitelist },
  } = state;

  const hide = () => dispatch(toggleChooseAddressModal(false));
  const choose = (whitelist) => {
    dispatch(chooseWhitelist(whitelist));
    hide();
  };

  const children = (
    <>
      {whitelist.map((w) => (
        <TouchableOpacity
          style={styles.pressable}
          key={w.id}
          onPress={() => choose(w)}
        >
          <View style={styles.flex}>
            <AppText medium style={styles.primary}>
              {w.name}
            </AppText>
            <AppText subtext style={styles.secondary}>
              {w.address}
            </AppText>
          </View>

          <View style={styles.right}>
            <AppText subtext style={{ color: '#C0C5E0' }}>
              {w.provider}
            </AppText>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );

  return (
    <AppModal
      visible={chooseAddressModalVisible}
      hide={hide}
      title="Choose Address"
      bottom
      children={children}
    />
  );
}

const styles = StyleSheet.create({
  pressable: {
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  flex: {
    flex: 1,
    marginRight: 20,
  },
  primary: {
    color: colors.PRIMARY_TEXT,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    marginTop: 3,
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});