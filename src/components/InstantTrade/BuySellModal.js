import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import AppModal from '../AppModal';
import AppText from '../AppText';
import AppButton from '../AppButton';
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
  fetchFee,
  saveCardTradeData,
  setCard,
  setCurrentTrade,
  setDepositProvider,
  setFee,
  submitTrade,
  switchBalanceCard,
} from '../../redux/trade/actions';
import GeneralError from '../GeneralError';
import AppWebView from '../AppWebView';
import { validateScale } from '../../utils/formUtils';

export default function BuySellModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [webViewUrl, setWebViewUrl] = useState('');

  const {
    modals: { buySellModalVisible },
    profile: { generalError },
    trade: {
      Balance_Card,
      tradeType,
      crypto,
      fiat,
      pairObject,
      balance: { balances },
      currentTrade: { size, price },
      card,
      cardTradeData,
    },
  } = state;

  const {
    pair: { baseScale, quoteScale },
  } = pairObject;

  const hide = () => {
    dispatch(toggleBuySellModal(false));
    dispatch(switchBalanceCard('balance'));
    dispatch(setCurrentTrade({ price: '', size: '' }));
  };

  const onDismiss = () => {
    dispatch(setDepositProvider(null));
    dispatch(setCard(null));
  };

  const handleSubmit = () => dispatch(submitTrade());

  const enabled = () => {
    if (Balance_Card === 'card' && !card) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    handleChangeText(price, 'crypto');
  }, [pairObject]);

  const handleChangeText = (text, type) => {
    const t = text.replace(',', '.');
    const rate =
      tradeType === 'Buy' ? pairObject.buyPrice : pairObject.sellPrice;

    if (type === 'crypto' && validateScale(t, quoteScale)) {
      dispatch(
        setCurrentTrade({
          price: t,
          size: (t / rate).toFixed(baseScale),
        })
      );
      card && t && dispatch(fetchFee());
    }
    if (type === 'fiat' && validateScale(t, baseScale)) {
      dispatch(
        setCurrentTrade({
          price: (t * rate).toFixed(quoteScale),
          size: t,
        })
      );
      card && t && dispatch(fetchFee());
    }
    !t && dispatch(setFee(null));
  };

  const myBalance = () => {
    const currency = tradeType === 'Buy' ? fiat : crypto;
    const fix = currency === fiat ? quoteScale : baseScale;
    let available;

    balances.forEach((b) => {
      if (b.currencyCode === currency) {
        available = b.available;
      }
    });
    return Number(available).toFixed(fix);
  };

  const hasEcommerce = () => {
    let hasEcommerce;
    balances.forEach((b) => {
      if (b.currencyCode === fiat) {
        hasEcommerce = b.depositMethods.ECOMMERCE;
      }
    });
    return hasEcommerce;
  };

  const handleUrlChange = (state) => {
    setWebViewUrl(state.url);
    const urlArray = webViewUrl.split('=');
    const ending = urlArray[urlArray.length - 1];
    if (ending === 'false' || ending === 'true') {
      dispatch(saveCardTradeData({}));
    }
  };

  const children = (
    <>
      <View style={styles.flex}>
        <AppText subtext body style={styles.balance}>
          My Balance: {myBalance()} {tradeType === 'Buy' ? fiat : crypto}
        </AppText>

        {tradeType === 'Buy' && hasEcommerce() && <BalanceCardSwitcher />}

        {generalError ? (
          <View style={{ marginTop: 16 }}>
            <GeneralError />
          </View>
        ) : null}

        <ScrollView nestedScrollEnabled>
          <TouchableOpacity activeOpacity={0.99}>
            <CurrencyDropdowns style={styles.dropdowns} />

            <AppInput
              onChangeText={(t) => handleChangeText(t, 'crypto')}
              keyboardType="decimal-pad"
              value={price.trim()}
              right={<AppText style={styles.code}>{fiat}</AppText>}
            />
            <View style={styles.margin} />
            <AppInput
              onChangeText={(t) => handleChangeText(t, 'fiat')}
              keyboardType="decimal-pad"
              value={size.trim()}
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

      <AppButton
        onPress={handleSubmit}
        disabled={!enabled()}
        backgroundColor={tradeType === 'Buy' ? '#0CCBB5' : '#F83974'}
        text={tradeType}
        style={{ opacity: enabled() ? 1 : 0.5, marginBottom: 20 }}
      />

      {cardTradeData.actionUrl && (
        <AppWebView
          handleUrlChange={handleUrlChange}
          source={{ uri: cardTradeData.actionUrl }}
        />
      )}
    </>
  );

  return (
    <AppModal
      visible={buySellModalVisible}
      hide={hide}
      fullScreen
      title={tradeType + ' ' + crypto}
      children={children}
      onDismiss={onDismiss}
    />
  );
}

const styles = StyleSheet.create({
  balance: {
    color: colors.SECONDARY_TEXT,
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
