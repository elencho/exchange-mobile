import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import images from '../../constants/images';
import { toggleChooseBankModal } from '../../redux/modals/actions';
import { cardsSagaAction, setDepositProvider } from '../../redux/trade/actions';
import AppModal from '../AppModal';
import AppText from '../AppText';

export default function ChooseBankModal() {
  const dispatch = useDispatch();
  const chooseBankModalVisible = useSelector(
    (state) => state.modals.chooseBankModalVisible
  );
  const state = useSelector((state) => state.trade);
  const { depositProvider, depositProviders } = state;

  const hide = () => {
    dispatch(toggleChooseBankModal(false));
  };

  const choose = (b) => {
    dispatch(setDepositProvider(b));
    dispatch(cardsSagaAction());
    hide();
  };

  const children = () => {
    if (depositProviders.length) {
      return depositProviders.map((b, i) => (
        <View key={b.displayName}>
          <Pressable
            style={[
              styles.row,
              b.provider === depositProvider && {
                backgroundColor: 'rgba(101, 130, 253, 0.16)',
              },
            ]}
            onPress={() => choose(b.provider)}
          >
            <Image source={images.TBC} />
            <AppText body style={styles.text}>
              {b.displayName}
            </AppText>
          </Pressable>
          {i < depositProviders.length - 1 && <View style={styles.margin} />}
        </View>
      ));
    }
  };

  return (
    <AppModal
      visible={chooseBankModalVisible}
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
  },
});
