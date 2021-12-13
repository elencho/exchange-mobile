import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../AppModal';
import { toggleBankFeesModal } from '../../redux/modals/actions';
import AppText from '../AppText';
import colors from '../../constants/colors';
import images from '../../constants/images';

export default function BankFeesModal() {
  const dispatch = useDispatch();
  const bankFeesModalVisible = useSelector(
    (state) => state.modals.bankFeesModalVisible
  );

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
            <Image source={images.MC_Card} />
          </View>
          <View style={styles.iconContainer}>
            <Image source={images.Visa} />
          </View>
          <View style={styles.iconContainer}>
            <Image source={images.MC_Card} />
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

      <View style={styles.row}>
        <AppText style={[styles.text, styles.flex]} body>
          $100 - $500
        </AppText>
        <View style={[styles.percentages, styles.flex]}>
          <View style={styles.percent}>
            <AppText body style={styles.text}>
              4.0%
            </AppText>
          </View>
          <View style={styles.percent}>
            <AppText body style={styles.text}>
              4.0%
            </AppText>
          </View>
          <View style={styles.percent}>
            <AppText body style={styles.text}>
              6.0%
            </AppText>
          </View>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.row}>
        <AppText style={[styles.text, styles.flex]} body>
          $500 - $700
        </AppText>
        <View style={[styles.percentages, styles.flex]}>
          <View style={styles.percent}>
            <AppText body style={styles.text}>
              3.5%
            </AppText>
          </View>
          <View style={styles.percent}>
            <AppText body style={styles.text}>
              3.5%
            </AppText>
          </View>
          <View style={styles.percent}>
            <AppText body style={styles.text}>
              5.5%
            </AppText>
          </View>
        </View>
      </View>
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
