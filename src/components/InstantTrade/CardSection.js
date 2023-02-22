import React, { useEffect } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Trans } from 'react-i18next';
import { t } from 'i18next';

import Fee from '../Wallet/Fee';
import AppText from '../AppText';
import PurpleText from '../PurpleText';

import colors from '../../constants/colors';
import images from '../../constants/images';
import {
  toggleChooseCardModal,
  toggleChooseBankModal,
  toggleBankFeesModal,
} from '../../redux/modals/actions';
import { setCard } from '../../redux/trade/actions';

function CardSection({ error }) {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    trade: {
      depositProvider,
      currentBalanceObj,
      card,
      fiat,
      cardsToDisplayInModal,
      balance: { balances },
    },
    transactions: { tabRoute, code },
    wallet: { walletTab },
  } = state;

  const wallet = tabRoute === 'Wallet';
  const trade = tabRoute === 'Trade';

  useEffect(() => {
    if (card) dispatch(setCard(null));
  }, [depositProvider]);

  const showCards = () => dispatch(toggleChooseCardModal(true));
  const showBanks = () => dispatch(toggleChooseBankModal(true));
  const showFees = () => dispatch(toggleBankFeesModal(true));

  const multipleBanks = () => {
    if (wallet) return true;
    let isMultiple;
    balances?.forEach((b) => {
      if (fiat === b.currencyCode) {
        isMultiple = b?.depositMethods?.ECOMMERCE?.length;
      }
    });
    return isMultiple;
  };

  const currencyName = (fiat) => {
    let name;
    balances?.forEach((b) => {
      if (b.currencyCode === fiat) name = b.currencyName;
    });
    return name;
  };

  const addNewCard = () =>
    dispatch({
      type: 'ADD_NEW_CARD_SAGA',
      name: currencyName(trade ? fiat : code),
      code: trade ? fiat : code,
      navigation,
      balances,
    });

  const color =
    !depositProvider && error
      ? '#F45E8C'
      : depositProvider
      ? colors.PRIMARY_TEXT
      : colors.SECONDARY_TEXT;
  const cardTextColor =
    !card && error
      ? '#F45E8C'
      : card
      ? colors.PRIMARY_TEXT
      : colors.SECONDARY_TEXT;
  const opacity = cardsToDisplayInModal?.length ? 1 : 0.5;
  const bankBorder = !depositProvider && error ? '#F45E8C' : '#525A86';
  const cardBorder = !card && error ? '#F45E8C' : '#525A86';

  const displayName = () => {
    let displayName = 'Payment Service Provider';
    const m =
      walletTab === 'Withdrawal' ? 'withdrawalMethods' : 'depositMethods';

    trade &&
      balances.forEach((b) => {
        if (b.currencyCode === fiat) {
          b[m]?.ECOMMERCE?.forEach((d) => {
            if (depositProvider === d.provider) displayName = d.displayName;
          });
        }
      });

    wallet &&
      currentBalanceObj[m]?.ECOMMERCE?.forEach((d) => {
        if (depositProvider === d.provider) displayName = d.displayName;
      });
    return displayName;
  };

  return (
    <View style={styles.container}>
      {multipleBanks() && (
        <>
          <Pressable
            style={[
              styles.dropdown,
              { marginBottom: 25, borderColor: bankBorder },
            ]}
            onPress={showBanks}
          >
            <AppText style={[styles.text, { color }]} medium={depositProvider}>
              {displayName()}
            </AppText>
            <Image source={images['Arrow']} />
          </Pressable>

          {/* {trade && depositProvider && (
            <AppText subtext style={styles.subText}>
              0 ₾-100 ₾ Visa / MC Card 5% Amex 7 %{' '}
              <PurpleText text=" More Fees" onPress={showFees} />
            </AppText>
          )} */}
        </>
      )}

      {depositProvider && (
        <>
          <Pressable
            style={[
              styles.dropdown,
              { opacity, marginBottom: 10, borderColor: cardBorder },
            ]}
            onPress={showCards}
            disabled={!cardsToDisplayInModal?.length}
          >
            <AppText
              style={[styles.text, { color: cardTextColor }]}
              medium={card ? card.cardNumber : false}
            >
              {card ? card.cardNumber : 'Choose Card'}
            </AppText>
            <Image source={images['Arrow']} />
          </Pressable>

          <AppText subtext style={styles.newCard}>
            <Trans
              i18nKey={`we ${
                !cardsToDisplayInModal?.length ? 'do not' : 'already'
              } have cards add card`}
              components={{
                purple: (
                  <PurpleText text={t('Add Card')} onPress={addNewCard} />
                ),
              }}
            />
          </AppText>

          {trade && (
            <View style={{ marginVertical: 22 }}>{card && <Fee />}</View>
          )}
        </>
      )}
    </View>
  );
}

export default CardSection;

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    height: 45,
    paddingHorizontal: 15,
  },
  container: {
    marginVertical: 20,
  },
  newCard: {
    color: colors.SECONDARY_TEXT,
  },
  subText: {
    color: colors.SECONDARY_TEXT,
    marginTop: -13,
    marginBottom: 25,
  },
  text: {
    color: colors.PRIMARY_TEXT,
    flex: 1,
  },
});
