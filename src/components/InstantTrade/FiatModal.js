import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import { COINS_URL_PNG } from '../../constants/api';
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
  const state = useSelector((state) => state);

  const {
    trade: { fiat, fiatsArray },
    modals: { fiatModalVisible },
  } = state;

  const hide = () => {
    dispatch(toggleFiatModal(false));
  };

  const choose = (f) => {
    dispatch(setFiat(f));
    dispatch(fetchOffers());
    dispatch(switchBalanceCard('balance'));
    hide();
  };

  const children = fiatsArray.map((f, i, a) => (
    <Pressable
      key={f.code}
      style={[
        styles.row,
        f.code === fiat && { backgroundColor: 'rgba(101, 130, 253, 0.16)' },
        { marginBottom: i < a.length - 1 ? 5 : -10 },
      ]}
      onPress={() => choose(f.code)}
    >
      <Image
        source={{
          uri: `${COINS_URL_PNG}/${f.code.toLowerCase()}.png`,
        }}
        style={styles.icon}
      />
      <AppText body style={styles.text}>
        {f.code}
      </AppText>
    </Pressable>
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
