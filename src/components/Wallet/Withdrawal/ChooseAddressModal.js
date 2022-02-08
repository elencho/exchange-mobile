import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../../AppModal';
import AppText from '../../AppText';
import colors from '../../../constants/colors';
import { toggleChooseAddressModal } from '../../../redux/modals/actions';

export default function ChooseAddressModal() {
  const dispatch = useDispatch();
  const chooseAddressModalVisible = useSelector(
    (state) => state.modals.chooseAddressModalVisible
  );

  const hide = () => {
    dispatch(toggleChooseAddressModal(false));
  };

  const children = (
    <>
      {['Name 1', 'Name 2', 'Name 3'].map((a) => (
        <Pressable
          style={[
            styles.pressable,
            { backgroundColor: a === 'Name 1' && 'rgba(101, 130, 253, 0.1)' },
          ]}
          key={a}
        >
          <View>
            <AppText medium style={styles.primary}>
              {a}
            </AppText>
            <AppText subtext style={styles.secondary}>
              asfgdsgsdgsfdgsdgsdg
            </AppText>
          </View>

          <View style={styles.right}>
            <AppText subtext style={{ color: '#C0C5E0' }}>
              ERC 20
            </AppText>
            <AppText subtext style={styles.secondary}>
              1234567890
            </AppText>
          </View>
        </Pressable>
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
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
