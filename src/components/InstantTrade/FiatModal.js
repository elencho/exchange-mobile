import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import images from '../../constants/images';
import { toggleFiatModal } from '../../redux/modals/actions';
import {
  fetchOffers,
  setFiat,
  switchBalanceCard,
} from '../../redux/trade/actions';
import AppModal from '../AppModal';
import AppText from '../AppText';

export default function FiatModal() {
  const dispatch = useDispatch();
  const fiatModalVisible = useSelector(
    (state) => state.modals.fiatModalVisible
  );
  const fiat = useSelector((state) => state.trade.fiat);

  const hide = () => {
    dispatch(toggleFiatModal(false));
  };

  const choose = (f) => {
    dispatch(setFiat(f));
    dispatch(fetchOffers());
    dispatch(switchBalanceCard('balance'));
    hide();
  };

  const mockArray = ['USD', 'GEL'];

  const children = mockArray.map((f, i) => (
    <View key={f}>
      <Pressable
        style={[
          styles.row,
          f === fiat && { backgroundColor: 'rgba(101, 130, 253, 0.16)' },
        ]}
        onPress={() => choose(f)}
      >
        <Image source={images[fiat]} style={styles.icon} />
        <AppText body style={styles.text}>
          {f}
        </AppText>
      </Pressable>
      {i < mockArray.length - 1 && <View style={styles.margin} />}
    </View>
  ));

  return (
    <AppModal
      visible={fiatModalVisible}
      hide={hide}
      title="Choose Currency"
      bottom
      children={children}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
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
