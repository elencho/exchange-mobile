import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Clipboard from 'expo-clipboard';

import colors from '../../../constants/colors';
import images from '../../../constants/images';
import { toggleChooseBankModal } from '../../../redux/modals/actions';
import AppText from '../../AppText';
import ChooseBankModal from '../../InstantTrade/ChooseBankModal';

const InfoRow = ({ title, text }) => {
  const copy = () => Clipboard.setString(text);

  return (
    <TouchableOpacity style={styles.infoRow} onPress={copy}>
      <AppText subtext style={styles.secondary}>
        {title}
      </AppText>
      <View style={styles.row}>
        <AppText style={styles.text}>{text}</AppText>
        <Image source={images.White_Copy} />
      </View>
    </TouchableOpacity>
  );
};

export default function BankInfo() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    trade: { depositProvider, depositProviders },
    wallet: {
      wireDepositInfo: { en },
    },
  } = state;

  const {
    receiverBankCountry,
    receiverBankSwift,
    receiverBankAddress,
    receiverIBAN,
    transferDescription,
    intermediateBankSwift,
    receiverName,
  } = en[0];

  const handleBanks = () => {
    dispatch(toggleChooseBankModal(true));
  };

  const bankName = () => {
    let bankName;
    depositProviders.forEach((d) => {
      if (depositProvider === d.provider) {
        bankName = d.displayName;
      }
    });
    return bankName;
  };

  const infoArray = [
    { title: 'Company Name', text: receiverName },
    { title: 'Country', text: receiverBankCountry },
    { title: 'SWIFT Code', text: receiverBankSwift },
    { title: 'Address', text: receiverBankAddress },
    { title: 'IBAN', text: receiverIBAN },
    { title: 'Description', text: transferDescription },
  ];

  const intermediateInfoArray = [
    { title: 'Bank Name', text: 'Citibank N.A.' },
    { title: 'Country', text: 'USA' },
    { title: 'SWIFT Code', text: 'CITIUS33' },
    { title: 'Address', text: '399 PARK AVENUE, NYC, NY' },
  ];

  return (
    <>
      <AppText medium style={styles.title}>
        Bank Info
      </AppText>

      {/* <Pressable style={styles.dropdown} onPress={handleBanks}>
        <View style={styles.subtext}>
          <AppText subtext style={styles.secondary}>
            Bank
          </AppText>
        </View>

        <Image source={images.TBC} style={styles.image} />
        <AppText medium style={styles.dropdownText}>
          {bankName()}
        </AppText>
        <View style={styles.line} />
        <Image source={images.Arrow} />
      </Pressable> */}

      {infoArray.map((i) => (
        <InfoRow title={i.title} text={i.text} key={i.title} />
      ))}

      <View style={styles.marginVertical} />

      {intermediateBankSwift && (
        <>
          <AppText medium style={[styles.title, { marginBottom: 15 }]}>
            Intermediary bank
          </AppText>
          {intermediateInfoArray.map((i) => (
            <InfoRow title={i.title} text={i.text} key={i.title} />
          ))}
        </>
      )}

      <ChooseBankModal />
    </>
  );
}

const styles = StyleSheet.create({
  dropdownText: {
    flex: 1,
    marginHorizontal: 12,
    color: colors.PRIMARY_TEXT,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 4,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    borderColor: '#42475D',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  image: {
    width: 18,
    height: 18,
    marginLeft: 5,
  },
  infoRow: {
    marginVertical: 7,
  },
  line: {
    width: 1,
    backgroundColor: '#3B4160',
    marginHorizontal: 15,
    height: 25,
  },
  marginVertical: {
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 3,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
  subtext: {
    position: 'absolute',
    left: 8,
    top: -7,
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingHorizontal: 8,
  },
  text: {
    color: colors.PRIMARY_TEXT,
  },
  title: {
    color: '#B7BFDB',
    marginBottom: 10,
  },
});
