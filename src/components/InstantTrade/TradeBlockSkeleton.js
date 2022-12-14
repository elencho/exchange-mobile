import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Skeleton from '../Skeleton';
import colors from '../../constants/colors';
import Timer from './Timer';

const FirstPart = () => (
  <View style={styles.mainWrapper}>
    <View style={styles.smallBox}>
      <Skeleton
        width={24}
        height={24}
        style={{ borderRadius: 100, marginRight: 14 }}
      />
      <Skeleton width={58} height={8} />
    </View>
    <View style={styles.smallBox}>
      <Skeleton
        width={24}
        height={24}
        style={{ borderRadius: 100, marginRight: 14 }}
      />
      <Skeleton width={58} height={8} />
    </View>
  </View>
);

const MiddlePart = () => (
  <View style={styles.smallBoxMiddle}>
    <Skeleton width={50} height={11} />
    <Skeleton width={82} height={8} style={{ marginTop: 8 }} />
  </View>
);

const TradeBlockSkeleton = () => {
  return (
    <View style={styles.container}>
      <FirstPart />
      <View style={styles.wrapper}>
        {[1, 2, 3, 4].map((n) => (
          <MiddlePart key={n} />
        ))}
      </View>
      <Timer />
    </View>
  );
};

export default TradeBlockSkeleton;

const styles = StyleSheet.create({
  smallBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 18,
    backgroundColor: 'rgba(63, 66, 91, 0.18)',

    paddingRight: 25,
  },

  mainWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingHorizontal: 24,
    paddingVertical: 36,
  },
  smallBoxMiddle: {
    backgroundColor: 'rgba(63, 66, 91, 0.18)',
    padding: 26,
    marginBottom: 10,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 28,
    marginBottom: 32,
  },
});
