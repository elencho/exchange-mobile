import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../../AppModal';
import { toggleChooseBankModal } from '../../../redux/modals/actions';
import AppText from '../../AppText';
import colors from '../../../constants/colors';
import { setWithdrawalBank } from '../../../redux/wallet/actions';

export default function WithdrawalBanksModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { chooseBankModalVisible },
    wallet: { banks, withdrawalBank },
  } = state;

  const hide = () => dispatch(toggleChooseBankModal(false));
  const choose = (b) => {
    dispatch(setWithdrawalBank(b));
    hide();
  };

  const children = (
    <>
      {[{ bankName: 'Other', id: null }, ...banks].map((b) => (
        <View key={b.id}>
          <Pressable
            style={[
              styles.row,
              b.bankName === withdrawalBank.bankName && {
                backgroundColor: 'rgba(101, 130, 253, 0.16)',
              },
            ]}
            onPress={() => choose(b)}
          >
            <AppText body style={styles.text}>
              {b.bankName}
            </AppText>
          </Pressable>
        </View>
      ))}
    </>
  );

  return (
    <AppModal
      children={children}
      hide={hide}
      bottom
      visible={chooseBankModalVisible}
      title="Choose Bank"
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 5,
    marginLeft: -15,
  },
  text: {
    color: colors.PRIMARY_TEXT,
  },
});
