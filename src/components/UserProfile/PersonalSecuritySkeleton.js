import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import Skeleton from '../Skeleton';
import AppSwitcher from '../AppSwitcher';
import AppText from '../AppText';

const FirstPart = ({ hasSwitch }) => (
  <View style={styles.mainWrapper}>
    <View style={styles.wrapper}>
      <View style={styles.lastWrapper}>
        <Skeleton width={34} height={34} style={{ borderRadius: 100 }} />
        <View style={styles.smallWrapper}>
          <Skeleton width={58} height={10} style={{ marginBottom: 15 }} />
          <Skeleton width={120} height={8} />
        </View>
      </View>
      <View>{hasSwitch && <AppSwitcher disabled />}</View>
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
      <AppText style={styles.text}>
        Please note: It is necessary one of the authentication method to be
        switched on
      </AppText>

      {[1, 2, 3].map((n, i) => (
        <View key={i}>
          <FirstPart hasSwitch />
        </View>
      ))}
      <View style={styles.line} />
      <FirstPart hasSwitch />
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
    marginTop: 36,
  },
  container: {
    backgroundColor: colors.PRIMARY_BACKGROUND,
    paddingHorizontal: 5,
    paddingBottom: 30,
    marginBottom: 12,
  },
  line: {
    height: 2,
    width: '100%',
    backgroundColor: colors.SECONDARY_BACKGROUND,
    marginTop: 25,
  },
  text: {
    color: '#696F8E',
    fontSize: 12,
  },
});
