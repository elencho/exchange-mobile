import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../../constants/colors';
import images from '../../../constants/images';
import { setDepositProvider } from '../../../redux/trade/actions';
import { toggleWireBanksModal } from '../../../redux/modals/actions';
import AppModal from '../../AppModal';
import AppText from '../../AppText';

export default function WireBanksModal() {
  const dispatch = useDispatch();
  const wireBanksModalVisible = useSelector(
    (state) => state.modals.wireBanksModalVisible
  );
  const state = useSelector((state) => state);
  const {
    trade: { depositProvider },
    wallet: { wireBanks },
  } = state;

  const hide = () => dispatch(toggleWireBanksModal(false));

  const choose = (b) => {
    dispatch(setDepositProvider(b));
    hide();
  };

  const children = () => {
    const abbr = (b) => b.iconName.split('.')[0];
    return wireBanks?.map((b, i) => (
      <View key={b.receiverBankName}>
        <Pressable
          style={[
            styles.row,
            depositProvider === abbr(b) && {
              backgroundColor: 'rgba(101, 130, 253, 0.16)',
            },
          ]}
          onPress={() => choose(abbr(b))}
        >
          <Image source={images.TBC} />
          <AppText body style={styles.text}>
            {b.receiverBankName}
          </AppText>
        </Pressable>
        {i < wireBanks?.length - 1 && <View style={styles.margin} />}
      </View>
    ));
  };

  return (
    <AppModal
      visible={wireBanksModalVisible}
      hide={hide}
      title="Choose Bank"
      bottom
      children={children()}
    />
  );
}

const styles = StyleSheet.create({
  margin: {
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: -15,
  },
  text: {
    color: colors.PRIMARY_TEXT,
    marginLeft: 15,
    textTransform: 'capitalize',
  },
});
