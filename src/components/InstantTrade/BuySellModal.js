import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import AppModal from '../AppModal';
import AppText from '../AppText';
import AppInput from '../AppInput';
import CurrencyDropdowns from './CurrencyDropdowns';
import { toggleBuySellModal } from '../../redux/modals/actions';
import BalanceCardSwitcher from './BalanceCardSwitcher';
import CardSection from './CardSection';
import ChooseCardModal from './ChooseCardModal';
import ChooseBankModal from './ChooseBankModal';
import BankFeesModal from './BankFeesModal';
import CryptoModal from './CryptoModal';
import FiatModal from './FiatModal';
import {
  setCurrentTrade,
  submitTrade,
  switchBalanceCard,
} from '../../redux/trade/actions';

export default function BuySellModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const {
    modals: { buySellModalVisible },
    trade: {
      Balance_Card,
      tradeType,
      crypto,
      fiat,
      pairObject,
      currentTrade: { size, price },
    },
  } = state;

  let rate;
  if (pairObject) {
    rate = tradeType === 'Buy' ? pairObject.buyPrice : pairObject.sellPrice;
  }

  const hide = () => {
    dispatch(toggleBuySellModal(false));
    dispatch(switchBalanceCard('balance'));
    dispatch(setCurrentTrade({ price: null, size: null }));
  };

  const handleSubmit = () => {
    dispatch(submitTrade());
    hide();
  };

  const children = (
    <>
      <View style={styles.flex}>
        <AppText subtext body style={styles.balance}>
          My Balance: 2 000.00 {fiat}
        </AppText>

        {tradeType === 'Buy' && <BalanceCardSwitcher />}

        <ScrollView nestedScrollEnabled>
          <TouchableOpacity activeOpacity={0.99}>
            <CurrencyDropdowns style={styles.dropdowns} />

            <AppInput
              onChangeText={(t) =>
                dispatch(
                  setCurrentTrade({ price: t, size: (t / rate).toFixed(6) })
                )
              }
              keyboardType="decimal-pad"
              value={price}
              right={<AppText style={styles.code}>{fiat}</AppText>}
            />
            <View style={styles.margin} />
            <AppInput
              onChangeText={(t) =>
                dispatch(
                  setCurrentTrade({ price: (t * rate).toFixed(6), size: t })
                )
              }
              keyboardType="decimal-pad"
              value={size}
              right={<AppText style={styles.code}>{crypto}</AppText>}
            />

            {Balance_Card === 'card' && <CardSection />}

            <CryptoModal />
            <FiatModal />
            <ChooseBankModal />
            <ChooseCardModal />
            <BankFeesModal />
          </TouchableOpacity>
        </ScrollView>
      </View>

      <Pressable
        onPress={handleSubmit}
        style={[
          styles.button,
          { backgroundColor: tradeType === 'Buy' ? '#0CCBB5' : '#F83974' },
        ]}
      >
        <AppText medium style={styles.buttonText}>
          {tradeType}
        </AppText>
      </Pressable>
    </>
  );

  return (
    <AppModal
      visible={buySellModalVisible}
      hide={hide}
      fullScreen
      title={tradeType + ' ' + crypto}
      children={children}
    />
  );
}

const styles = StyleSheet.create({
  balance: {
    color: colors.SECONDARY_TEXT,
  },
  button: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: colors.PRIMARY_TEXT,
  },
  code: {
    color: '#42475D',
  },
  container: {
    backgroundColor: colors.PRIMARY_BACKGROUND,
  },
  dropdowns: {
    marginVertical: 20,
  },
  flex: {
    flex: 1,
  },
  margin: {
    marginVertical: 10,
  },
});
