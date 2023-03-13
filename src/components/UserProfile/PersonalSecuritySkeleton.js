import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import Skeleton from '../Skeleton';

const FirstPart = () => (
  <View style={styles.mainWrapper}>
    <View style={styles.wrapper}>
      <View style={styles.lastWrapper}>
        <Skeleton width={34} height={34} style={{ borderRadius: 100 }} />
        <View style={styles.smallWrapper}>
          <Skeleton width={58} height={10} style={{ marginBottom: 8 }} />
          <Skeleton width={120} height={8} />
        </View>
      </View>
      <View style={styles.secSmallWrapper}>
        <Skeleton width={36} height={10} style={{ marginBottom: 8 }} />
      </View>
    </View>
  </View>
);

const SecondPart = () => (
  <View style={styles.container}>
    <View style={styles.wrapper}>
      <View style={styles.lastWrapper}>
        <View style={styles.smallWrapper}>
          <Skeleton
            width={122}
            height={12}
            style={{ marginBottom: 24, marginTop: 30 }}
          />
          <Skeleton width={67} height={8} style={{ marginBottom: 8 }} />
          <Skeleton width={130} height={8} style={{ marginBottom: 8 }} />
          <Skeleton width={101} height={8} style={{ marginBottom: 8 }} />
        </View>
      </View>
      <View style={styles.secSmallWrapper}>
        <Skeleton
          width={36}
          height={10}
          style={{ marginBottom: 24, marginTop: 30 }}
        />
        <Skeleton width={96} height={10} style={{ marginBottom: 8 }} />
        <Skeleton width={64} height={10} style={{ marginBottom: 8 }} />
        <Skeleton width={119} height={10} style={{ marginBottom: 8 }} />
      </View>
    </View>
  </View>
);

const PersonalSecuritySkeleton = () => (
  <>
    <View style={styles.container}>
      <Skeleton
        width={295}
        height={8}
        style={{ marginBottom: 12, marginTop: 34 }}
      />
      <Skeleton width={140} height={8} />

      {[1, 2].map((n, i) => (
        <View key={i}>
          <FirstPart />
        </View>
      ))}
    </View>
    <View style={styles.container}>
      <FirstPart />
    </View>
  </>
);

export default PersonalSecuritySkeleton;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flex: 1,
  },
  smallWrapper: {
    marginLeft: 18,
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
    paddingHorizontal: 24,
    paddingBottom: 30,
    marginBottom: 12,
  },
});
