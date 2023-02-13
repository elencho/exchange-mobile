import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
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
  fetchTrades,
  saveTrades,
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
import { errorHappenedHere, validateAmount } from '../../utils/appUtils';
import WithKeyboard from '../WithKeyboard';

export default function BuySellModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const {
    modals: { buySellModalVisible, webViewObj },
    trade: {
      Balance_Card,
      tradeType,
      crypto,
      fiat,
      pairObject,
      balance,
      currentTrade,
      depositProvider,
      card,
    },
  } = state;

  const [error, setError] = useState(false);

  useEffect(() => {
    error && setError(false);
  }, [
    currentTrade,
    depositProvider,
    card,
    Balance_Card,
    fiat,
    crypto,
    buySellModalVisible,
  ]);

  useEffect(() => {
    handleChangeText(price, 'crypto');
    dispatch(saveTrades([]));
    dispatch(fetchTrades());
  }, [pairObject]);

  useEffect(() => {
    dispatch(setCurrentTrade({ price: '', size: '' }));
  }, [fiat, crypto]);

  useEffect(() => {
    if (card) handleChangeText(price, 'crypto');
  }, [card]);

  const baseScale = pairObject?.pair?.baseScale;
  const quoteScale = pairObject?.pair?.quoteScale;
  const size = currentTrade?.size;
  const price = currentTrade?.price;
  const balances = balance?.balances;

  const getMaxLength = (value, scale) => {
    const isDecimal = value && (value % 1 != 0 || value.includes('.'));
    const factoredDigit = Math.trunc(value);
    const factoredDigitLength = parseFloat(factoredDigit.toString().length);
    return isDecimal ? factoredDigitLength + 1 + parseFloat(scale) : 1000;
  };

  const maxLengthQuote = getMaxLength(price, pairObject?.pair?.quoteScale);
  const maxLengthBase = getMaxLength(size, pairObject?.pair?.baseScale);

  const hide = () => {
    dispatch(toggleBuySellModal(false));
    dispatch(setCurrentTrade({ price: '', size: '' }));
    dispatch(setFee(null));
  };

  const onDismiss = () => {
    dispatch(setDepositProvider(null));
    dispatch(setCard(null));
    dispatch(switchBalanceCard('balance'));
  };

  const handleSubmit = () => {
    const balanceCondition = !validateAmount(price) || !validateAmount(size);
    const cardCondition = balanceCondition || !depositProvider || !card;

    if (
      (Balance_Card === 'balance' && balanceCondition) ||
      (Balance_Card === 'card' && cardCondition)
    ) {
      setError(true);
    } else dispatch(submitTrade());
  };

  const handleChangeText = (text, type) => {
    if (text === '') {
      dispatch(setCurrentTrade({ price: '', size: '' }));
      return;
    }
    const t = text ? text.replace(',', '.') : 0;
    const rate =
      tradeType === 'Buy' ? pairObject.buyPrice : pairObject.sellPrice;

    if (type === 'crypto' && validateScale(t, quoteScale)) {
      dispatch(
        setCurrentTrade({
          price: t,
          size: (t / rate).toFixed(baseScale),
        })
      );
      card && dispatch(fetchFee());
    }
    if (type === 'fiat' && validateScale(t, baseScale)) {
      dispatch(
        setCurrentTrade({
          price: (t * rate).toFixed(quoteScale),
          size: t,
        })
      );
      card && dispatch(fetchFee());
    }
  };

  const myBalance = () => {
    const currency = tradeType === 'Buy' ? fiat : crypto;
    const fix = currency === fiat ? quoteScale : baseScale;

    let available;
    balances?.forEach((b) => {
      if (b.currencyCode === currency) available = b.available;
    });
    return Number(available).toFixed(fix);
  };

  const hasEcommerce = () => {
    let hasEcommerce;
    balances?.forEach((b) => {
      if (b.currencyCode === fiat) hasEcommerce = b.depositMethods.ECOMMERCE;
    });
    return hasEcommerce;
  };

  const onNavigationStateChange = (state) => {
    const urlArray = state.url.split('=');
    const ending = urlArray[urlArray.length - 1];
    if (ending === 'false' || ending === 'true') {
      dispatch({ type: 'RESET_APP_WEBVIEW_OBJ' });
      dispatch({ type: 'BALANCE_SAGA' });
      dispatch(saveTrades([]));
      dispatch(fetchTrades());
      dispatch(toggleBuySellModal(false));
    }
  };

  const children = (
    <WithKeyboard padding flexGrow modal>
      <View style={styles.flex}>
        <AppText subtext body style={styles.balance}>
          My Balance: {myBalance()} {tradeType === 'Buy' ? fiat : crypto}
        </AppText>

        {tradeType === 'Buy' && hasEcommerce() && <BalanceCardSwitcher />}

        <GeneralError
          style={styles.error}
          show={errorHappenedHere('BuySellModal')}
        />

        <TouchableOpacity
          activeOpacity={0.99}
          style={{ marginBottom: 30, flex: 1 }}
        >
          <CurrencyDropdowns style={styles.dropdowns} />

          <AppInput
            onChangeText={(t) => handleChangeText(t, 'crypto')}
            keyboardType="decimal-pad"
            value={price ? price.trim() : ''}
            maxLength={maxLengthQuote}
            right={<AppText style={styles.code}>{fiat}</AppText>}
            error={error && !validateAmount(price)}
          />
          <View style={styles.margin} />
          <AppInput
            onChangeText={(t) => handleChangeText(t, 'fiat')}
            keyboardType="decimal-pad"
            maxLength={maxLengthBase}
            value={size ? size.trim() : ''}
            right={<AppText style={styles.code}>{crypto}</AppText>}
            style={{ marginBottom: 10 }}
            error={error && !validateAmount(size)}
          />

          {Balance_Card === 'card' && tradeType === 'Buy' && (
            <CardSection error={error} />
          )}

          <CryptoModal />
          <FiatModal />
          <ChooseBankModal />
          <ChooseCardModal />
          <BankFeesModal />
        </TouchableOpacity>
        <AppButton
          onPress={handleSubmit}
          backgroundColor={tradeType === 'Buy' ? '#0CCBB5' : '#F83974'}
          text={tradeType}
          style={{ marginBottom: 20 }}
        />
      </View>

      <AppWebView
        onNavigationStateChange={onNavigationStateChange}
        source={{ uri: webViewObj?.actionUrl }}
        trade
      />
    </WithKeyboard>
  );

  return (
    <AppModal
      visible={buySellModalVisible}
      hide={hide}
      fullScreen
      title={tradeType + ' ' + crypto}
      children={children}
      onModalHide={onDismiss}
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
  error: {
    marginTop: 16,
  },
  flex: {
    flex: 1,
  },
  margin: {
    marginVertical: 10,
  },
});
