import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../../constants/colors';
import images from '../../../constants/images';
import { toggleChooseBankModal } from '../../../redux/modals/actions';
import AppText from '../../AppText';
import ChooseBankModal from '../../InstantTrade/ChooseBankModal';

const InfoRow = ({ title, text }) => {
  return (
    <View style={styles.infoRow}>
      <AppText subtext style={styles.secondary}>
        {title}
      </AppText>
      <View style={styles.row}>
        <AppText style={styles.text}>{text}</AppText>
        <Image source={images.White_Copy} />
      </View>
    </View>
  );
};

export default function BankInfo() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.trade);
  const { depositProvider, depositProviders } = state;

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

  return (
    <>
      <AppText medium style={styles.title}>
        Bank Info
      </AppText>

      <Pressable style={styles.dropdown} onPress={handleBanks}>
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
      </Pressable>

      <InfoRow title="Company name" text="Digital Ledger Technologies LLC" />
      <InfoRow title="Country" text="Georgia" />
      <InfoRow title="SWIFT Code" text="BAGAGE22" />
      <InfoRow title="Address" text="29a Gagarin street, Tbilisi 0160" />
      <InfoRow title="IBAN" text="GE12BG00000000100023456" />
      <InfoRow title="Description" text="Balance Replenish WT/GEL/Ttg1Ztvtf0" />

      <View style={styles.marginVertical} />

      <AppText medium style={[styles.title, { marginBottom: 15 }]}>
        Intermediary bank
      </AppText>
      <InfoRow title="Bank Name" text="Citibank N.A." />
      <InfoRow title="Country" text="USA" />
      <InfoRow title="SWIFT Code" text="CITIUS33" />
      <InfoRow title="Address" text="399 PARK AVENUE, NYC, NY" />

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
  },
});
