import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../../constants/colors';
import images from '../../../constants/images';
import { toggleWireBanksModal } from '../../../redux/modals/actions';
import AppText from '../../AppText';
import WireBanksModal from './WireBanksModal';
import { ICONS_URL_PNG } from '../../../constants/api';
import { copyToClipboard } from '../../../utils/copyToClipboard';

const InfoRow = ({ title, text }) => {
  const copy = () => copyToClipboard(text);

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
  const [info, setInfo] = useState({});
  const {
    wallet: { wireDepositInfo, wireDepositProvider },
    profile: { language },
  } = state;

  useEffect(() => {
    const obj = wireDepositInfo[language]?.find((o) => {
      dispatch({
        type: 'SET_WIRE_DEPOSIT_PROVIDER',
        wireDepositProvider: o.iconName.split('.')[0],
      });
      return o;
    });

    setInfo({
      country: obj?.receiverBankCountry,
      swift: obj?.receiverBankSwift,
      address: obj?.receiverBankAddress,
      iban: obj?.receiverIBAN,
      description: obj?.transferDescription,
      name: obj?.receiverName,

      intName: obj?.intermediateBankName,
      intCountry: obj?.intermediateCountry,
      intSwift: obj?.intermediateBankSwift,
      intAddress: obj?.intermediateAddress,
    });
  }, [wireDepositInfo]);

  const handleBanks = () => dispatch(toggleWireBanksModal(true));

  const infoArray = [
    { title: 'Company Name', text: info.name },
    { title: 'Country', text: info.country },
    { title: 'SWIFT Code', text: info.swift },
    { title: 'Address', text: info.address },
    { title: 'IBAN', text: info.iban },
    { title: 'Description', text: info.description },
  ];

  const intermediateInfoArray = [
    { title: 'Bank Name', text: info.intName },
    { title: 'Country', text: info.intCountry },
    { title: 'SWIFT Code', text: info.intSwift },
    { title: 'Address', text: info.intAddress },
  ];

  return (
    <>
      <AppText medium style={styles.title}>
        Bank Info
      </AppText>

      <Pressable style={styles.dropdown} onPress={handleBanks}>
        <View style={styles.subtext}>
          <AppText subtext style={styles.secondary}>
            Payment Service Provider
          </AppText>
        </View>
        <Image
          source={{ uri: `${ICONS_URL_PNG}/${wireDepositProvider}.png` }}
          style={styles.image}
        />
        <AppText medium style={styles.dropdownText}>
          {wireDepositProvider ?? 'Choose Bank'}
        </AppText>
        <View style={styles.line} />
        <Image source={images.Arrow} />
      </Pressable>

      <>
        {infoArray.map((i) => (
          <InfoRow title={i.title} text={i.text} key={i.title} />
        ))}
        <Text style={styles.light}>
          This identifier is mandatory when transferring funds
        </Text>
      </>

      {/* <View style={styles.marginVertical} /> */}

      {info.intSwift && (
        <>
          <AppText
            medium
            style={[styles.title, { marginBottom: 15, marginTop: 25 }]}
          >
            Intermediary bank
          </AppText>
          {intermediateInfoArray.map((i) => (
            <View key={i.title}>
              {i?.text && <InfoRow title={i.title} text={i.text} />}
            </View>
          ))}
        </>
      )}

      <WireBanksModal setInfo={setInfo} />
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
    resizeMode: 'contain',
  },
  infoRow: {
    marginVertical: 7,
  },
  line: {
    width: 1,
    backgroundColor: '#3B4160',
    marginHorizontal: 20,
    height: 25,
  },
  light: {
    color: '#F2DFB4',
    fontFamily: 'Ubuntu_Regular',
    fontSize: 11,
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
