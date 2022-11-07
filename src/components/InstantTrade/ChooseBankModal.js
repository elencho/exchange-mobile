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
    trade: { depositProvider, depositProviders, currentBalanceObj },
    transactions: { tabRouteName },
    wallet: { wireDepositProviders, walletTab, network },
  } = state;

  useEffect(() => {
    dispatch(setDepositProvider(null));
    dispatch({ type: 'SET_WIRE_DEPOSIT_PROVIDER', wireDepositProvider: null });
  }, []);

  const array = () => {
    // const wallet = tabRouteName === 'Wallet';
    // const trade = tabRouteName === 'Trade';
    // const manageCards = walletTab === 'Manage Cards';
    // const deposit = walletTab === 'Deposit';
    // const withdrawal = walletTab === 'Withdrawal';
    const ecommerce = network === 'ECOMMERCE';

    // if ((wallet && manageCards) || trade) return depositProviders;
    // if (wallet && deposit) {
    //   if (ecommerce) return depositProviders;
    //   if (!ecommerce) return wireDepositProviders;
    // }
    const m =
      walletTab === 'Withdrawal' ? 'withdrawalMethods' : 'depositMethods';

    if (!ecommerce) return wireDepositProviders;
    return currentBalanceObj[m]?.ECOMMERCE;
  };

  const hide = () => dispatch(toggleChooseBankModal(false));

  const choose = (b) => {
    dispatch(setDepositProvider(b));
    dispatch(cardsSagaAction());
    hide();
  };

  const children = () => {
    return array()?.map((b, i, a) => (
      <View key={i}>
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
