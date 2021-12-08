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
import Background from '../Background';
import Headline from '../TransactionHistory/Headline';
import CloseModalIcon from './CloseModalIcon';
import CurrencyDropdowns from './CurrencyDropdowns';
import { toggleBuySellModal } from '../../redux/modals/actions';
import BalanceCardSwitcher from './BalanceCardSwitcher';
import CardSection from './CardSection';
import ChooseCardModal from './ChooseCardModal';
import ChooseBankModal from './ChooseBankModal';
import BankFeesModal from './BankFeesModal';

export default function BuySellModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { buySellModalVisible },
    trade: { Balance_Card },
  } = state;

  const hide = () => {
    dispatch(toggleBuySellModal(false));
  };

  return (
    <AppModal visible={buySellModalVisible} hide={hide}>
      <Background>
        <View style={styles.flex}>
          <CloseModalIcon onPress={hide} />

          <Headline title="Buy BTC" />

          <AppText subtext body style={styles.balance}>
            My Balance: 2 000.00 GEL
          </AppText>

          <BalanceCardSwitcher />

          <ScrollView nestedScrollEnabled>
            <TouchableOpacity activeOpacity={0.99}>
              <CurrencyDropdowns style={styles.dropdowns} />

              <AppInput
                keyboardType="decimal-pad"
                right={<AppText style={styles.code}>GEL</AppText>}
              />
              <View style={styles.margin} />
              <AppInput
                keyboardType="decimal-pad"
                right={<AppText style={styles.code}>BTC</AppText>}
              />

              {Balance_Card === 'card' && <CardSection />}

              <ChooseBankModal />
              <ChooseCardModal />
              <BankFeesModal />
            </TouchableOpacity>
          </ScrollView>
        </View>

        <Pressable style={styles.button}>
          <AppText medium style={styles.buttonText}>
            Buy
          </AppText>
        </Pressable>
      </Background>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  balance: {
    color: colors.SECONDARY_TEXT,
  },
  button: {
    height: 45,
    backgroundColor: '#0CCBB5',
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
