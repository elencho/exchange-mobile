import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import colors from '../../constants/colors';
import Skeleton from '../Skeleton';

const IS_IOS = Platform.OS === 'ios';

const SecondPart = () => (
  <View style={styles.container}>
    <View style={styles.lastWrapper}>
      <View style={styles.smallWrapper}>
        <Skeleton
          width={59}
          height={10}
          style={{ marginBottom: 8, marginTop: 30 }}
        />
        <Skeleton width={96} height={8} style={{ marginBottom: 14 }} />
        <Skeleton width={125} height={7} style={{ marginBottom: 8 }} />
      </View>
    </View>
    <View style={styles.secSmallWrapper}>
      <Skeleton
        width={92}
        height={10}
        style={{ marginBottom: 8, marginTop: 30 }}
      />
      <Skeleton width={122} height={8} style={{ marginBottom: 14 }} />
      <Skeleton width={52} height={7} style={{ marginBottom: 8 }} />
    </View>
  </View>
);

const OneTransactionSkeleton = () => {
  return (
    <View style={styles.box}>
      {[0].map((n) => (
        <View key={n}>
          <SecondPart />
          <View style={styles.line} />
        </View>
      ))}
    </View>
  );
};

export default OneTransactionSkeleton;

const styles = StyleSheet.create({
  smallWrapper: {
    justifyContent: 'center',
  },
  lastWrapper: {
    flexDirection: 'row',
    flex: 1,
  },
  secSmallWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  mainWrapper: {
    marginTop: 30,
  },
  container: {
    backgroundColor: colors.SECONDARY_BACKGROUND,

    marginBottom: 12,
    flexDirection: 'row',
    flex: 1,
  },
  box: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingBottom: IS_IOS ? 0 : 30,
    marginBottom: IS_IOS ? 0 : 10,
  },
  line: {
    backgroundColor: '#232945',
    height: 2,
    flex: IS_IOS ? 1 : 0,
    marginTop: IS_IOS ? 0 : 40,
  },
});
