import React, { useEffect } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { ICONS_URL_PNG } from '../../constants/api';
import colors from '../../constants/colors';
import { toggleChooseBankModal } from '../../redux/modals/actions';
import { cardsSagaAction, setDepositProvider } from '../../redux/trade/actions';
import AppModal from '../AppModal';
import AppText from '../AppText';

export default function ChooseBankModal() {
  const dispatch = useDispatch();
  const chooseBankModalVisible = useSelector(
    (state) => state.modals.chooseBankModalVisible
  );
  const state = useSelector((state) => state);
  const {
    trade: { depositProvider, depositProviders, currentBalanceObj, cards },
    transactions: { tabRouteName },
    wallet: { walletTab },
  } = state;

  useEffect(() => {
    dispatch(setDepositProvider(null));
  }, []);

  const array = () => {
    let array = [];

    const arrayFullCheck = (a, p) => {
      let isFull = false;
      a.forEach((b) => {
        if (Object.values(b).includes(p)) isFull = true;
      });
      return isFull;
    };

    const m =
      walletTab === 'Withdrawal' ? 'withdrawalMethods' : 'depositMethods';

    if (tabRouteName === 'Wallet') {
      depositProviders?.forEach((p) => {
        currentBalanceObj[m]?.ECOMMERCE?.forEach((d) => {
          if (p.displayName === d.displayName) {
            cards?.forEach((c) => {
              if (c.provider === d.provider) {
                if (!array.length) {
                  array.push(d);
                } else {
                  !arrayFullCheck(array, d.provider) && array.push(d);
                }
              }
            });
          }
        });
      });

      if (walletTab === 'Manage Cards') return depositProviders;
    }

    if (tabRouteName === 'Trade') {
      depositProviders?.forEach((d) => {
        cards?.forEach((c) => {
          if (c.provider === d.provider) {
            if (!array.length) array.push(d);
            else !arrayFullCheck(array, d.provider) && array.push(d);
          }
        });
      });
    }
    return array;
  };

  const hide = () => {
    dispatch(toggleChooseBankModal(false));
  };

  const choose = (b) => {
    dispatch(setDepositProvider(b));
    dispatch(cardsSagaAction());
    hide();
  };

  const children = () =>
    array().map((b, i, a) => (
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
          <Image
            source={{ uri: `${ICONS_URL_PNG}/${b.provider}.png` }}
            style={styles.image}
          />
          <AppText body style={styles.text}>
            {b.displayName}
          </AppText>
        </Pressable>
        {i < a.length - 1 && <View style={styles.margin} />}
      </View>
    ));

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
  image: {
    width: 24,
    height: 20,
    resizeMode: 'contain',
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
