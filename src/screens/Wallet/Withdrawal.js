import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import WalletCoinsDropdown from '../../components/Wallet/Deposit/WalletCoinsDropdown';
import AppText from '../../components/AppText';
import AppInput from '../../components/AppInput';
import colors from '../../constants/colors';
import images from '../../constants/images';
import PurpleText from '../../components/PurpleText';
import { toggleChooseAddressModal } from '../../redux/modals/actions';
import ChooseAddressModal from '../../components/Wallet/Withdrawal/ChooseAddressModal';

export default function Withdrawal() {
  const dispatch = useDispatch();

  const Max = () => (
    <View style={styles.row}>
      <View style={styles.line} />
      <PurpleText text="Max" />
    </View>
  );

  const chooseAddress = () => dispatch(toggleChooseAddressModal(true));

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.block}>
        <WalletCoinsDropdown />

        <Pressable style={styles.dropdown} onPress={chooseAddress}>
          <AppText body style={styles.secondary}>
            Choose Address
          </AppText>

          <View style={styles.arrow}>
            <Image source={images.Arrow} />
          </View>
        </Pressable>
      </View>

      <View style={styles.block}>
        <AppInput placeholder="Amount" style={styles.amount} right={<Max />} />
        <AppText subtext style={styles.secondary}>
          Fee = 0; Total amount = 0 GEL
        </AppText>
        <AppInput style={styles.note} placeholder="Enter Note" />
      </View>

      <Pressable style={styles.button}>
        <AppText medium style={styles.buttonText}>
          Withdrawal
        </AppText>
      </Pressable>

      <ChooseAddressModal />
    </View>
  );
}

const styles = StyleSheet.create({
  amount: {
    marginBottom: 7,
  },
  arrow: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  block: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: colors.SECONDARY_PURPLE,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonText: {
    color: colors.PRIMARY_TEXT,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#3C4167',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
  },
  line: {
    width: 1,
    backgroundColor: '#3B4160',
    marginHorizontal: 16,
  },
  note: {
    marginTop: 22,
  },
  row: {
    flexDirection: 'row',
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
});
