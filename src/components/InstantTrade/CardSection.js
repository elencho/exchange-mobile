import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { withNavigation } from 'react-navigation';

import colors from '../../constants/colors';
import images from '../../constants/images';
import {
  toggleChooseCardModal,
  toggleChooseBankModal,
  toggleBankFeesModal,
} from '../../redux/modals/actions';
import AppText from '../AppText';
import PurpleText from '../PurpleText';
import InfoMark from './InfoMark';

function CardSection({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.trade);
  const {
    depositProvider,
    depositProviders,
    card,
    fiat,
    fee,
    balance: { balances },
  } = state;

  const showCards = () => dispatch(toggleChooseCardModal(true));
  const showBanks = () => dispatch(toggleChooseBankModal(true));
  const showFees = () => dispatch(toggleBankFeesModal(true));

  const multipleBanks = () => {
    let isMultiple;
    balances.forEach((b) => {
      if (fiat === b.currencyCode) {
        isMultiple = b.depositMethods.ECOMMERCE.length > 1;
      }
    });
    return isMultiple;
  };

  // const displayName = () => {
  //   let displayName;
  //   depositProviders.forEach((d) => {
  //     if (depositProvider === d.provider) {
  //       displayName = d.displayName;
  //     } else {
  //       displayName = 'Choose Bank';
  //     }
  //   });
  //   return displayName;
  // };

  const currencyName = (fiat) => {
    let name;
    balances.forEach((b) => {
      if (b.currencyCode === fiat) name = b.currencyName;
    });
    return name;
  };

  const addNewCard = () =>
    dispatch({
      type: 'ADD_NEW_CARD_SAGA',
      name: currencyName(fiat),
      code: fiat,
      navigation,
      balances,
      fiat,
    });

  const color = depositProvider ? colors.PRIMARY_TEXT : colors.SECONDARY_TEXT;
  const opacity = depositProvider ? 1 : 0.5;

  return (
    <View style={styles.container}>
      {multipleBanks() && (
        <>
          <Pressable style={styles.dropdown} onPress={showBanks}>
            {/* <Image source={images[c]} />  BANKIS AN BARATIS LOGO */}
            <AppText style={[styles.text, { color }]} medium={depositProvider}>
              {depositProvider ? depositProvider : 'Payment Service Provider'}
            </AppText>
            <Image source={images['Arrow']} />
          </Pressable>

          <AppText subtext style={styles.subText}>
            0 ₾-100 ₾ Visa / MC Card 5% Amex 7 %{' '}
            <PurpleText text=" More Fees" onPress={showFees} />
          </AppText>
        </>
      )}

      <Pressable
        style={[styles.dropdown, { opacity }]}
        onPress={showCards}
        disabled={!depositProvider}
      >
        {/* <Image source={images[c]} />  BANKIS AN BARATIS LOGO */}
        <AppText
          style={[
            styles.text,
            { color: card ? colors.PRIMARY_TEXT : colors.SECONDARY_TEXT },
          ]}
          medium={card ? card.cardNumber : false}
        >
          {card ? card.cardNumber : 'Choose Card'}
        </AppText>
        <Image source={images['Arrow']} />
      </Pressable>

      <AppText subtext style={styles.subText}>
        Or you can add <PurpleText text=" New Card" onPress={addNewCard} />
      </AppText>

      {fee && (
        <View style={styles.info}>
          <InfoMark inner="i" color={colors.SECONDARY_TEXT} />
          <AppText subtext style={styles.infoText}>
            MasterCard 3%; Total amount = {fee.totalAmount} {fiat}
          </AppText>
        </View>
      )}
    </View>
  );
}

export default withNavigation(CardSection);

const styles = StyleSheet.create({
  dropdown: {
    borderColor: '#525A86',
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    height: 45,
    paddingHorizontal: 15,
  },
  container: {
    marginVertical: 20,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  infoText: {
    color: colors.SECONDARY_TEXT,
    marginHorizontal: 10,
  },
  subText: {
    color: colors.SECONDARY_TEXT,
    marginTop: 10,
    marginBottom: 25,
  },
  text: {
    color: colors.PRIMARY_TEXT,
    flex: 1,
  },
});
