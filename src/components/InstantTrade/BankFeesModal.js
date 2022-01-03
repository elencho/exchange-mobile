import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../AppModal';
import { toggleBankFeesModal } from '../../redux/modals/actions';
import AppText from '../AppText';
import colors from '../../constants/colors';
import images from '../../constants/images';

export default function BankFeesModal() {
  let feesArray = [];
  let rangesObject = {};

  const dispatch = useDispatch();
  const bankFeesModalVisible = useSelector(
    (state) => state.modals.bankFeesModalVisible
  );

  const state = useSelector((state) => state.trade);

  const {
    balance: { balances },
    fiat,
    depositProvider,
  } = state;

  const makeFeesArray = (arr) => {
    arr.forEach((b) => {
      if (fiat === b.currencyCode) {
        b.fees.forEach((f) => {
          if (f.type === 'DEPOSIT' && f.provider === depositProvider) {
            feesArray = f.fees;
          }
        });
      }
    });
  };

  const makeRangesArray = (arr) => {
    arr.forEach((f) => {
      if (f.rangeStart === 0 && f.rangeEnd === 100) {
        rangesObject = { ...rangesObject, f };
      }
    });
  };

  useEffect(() => {
    makeFeesArray(balances);
    makeRangesArray(feesArray);
    // console.log(feesArray);
    // console.log(rangesObject);
    // dasamtavrebelia
  }, []);

  const hide = () => {
    dispatch(toggleBankFeesModal(false));
  };

  const children = (
    <>
      <View style={[styles.row, { marginBottom: 20 }]}>
        <AppText style={[styles.subtext, styles.flex]} body>
          From - To
        </AppText>
        <View style={[styles.icons, styles.flex]}>
          <View style={styles.iconContainer}>
            <Image source={images.MASTERCARD} />
          </View>
          <View style={styles.iconContainer}>
            <Image source={images.VISA} />
          </View>
          <View style={styles.iconContainer}>
            <Image source={images.AMEX} />
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <AppText style={[styles.text, styles.flex]} body>
          $0 - $100
        </AppText>
        <View style={[styles.percentages, styles.flex]}>
          <View style={styles.percent}>
            <AppText body style={styles.text}>
              5.0%
            </AppText>
          </View>
          <View style={styles.percent}>
            <AppText body style={styles.text}>
              5.0%
            </AppText>
          </View>
          <View style={styles.percent}>
            <AppText body style={styles.text}>
              7.0%
            </AppText>
          </View>
        </View>
      </View>
      <View style={styles.line} />
    </>
  );

  return (
    <AppModal
      visible={bankFeesModalVisible}
      hide={hide}
      title="About Bank Fees"
      bottom
      children={children}
    />
  );
}

const styles = StyleSheet.create({
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  percentages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  percent: {
    alignItems: 'center',
    width: 40, // same as icon container
  },
  container: {
    padding: 35,
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
  column: {
    alignItems: 'center',
  },
  flex: {
    flex: 0.5,
  },
  header: {
    color: colors.PRIMARY_TEXT,
    marginBottom: 25,
  },
  iconContainer: {
    width: 40,
    height: 25,
    backgroundColor: 'rgba(146, 142, 186, 0.18)',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#2E2E4D',
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtext: {
    color: colors.SECONDARY_TEXT,
  },
  text: {
    color: colors.PRIMARY_TEXT,
  },
});
