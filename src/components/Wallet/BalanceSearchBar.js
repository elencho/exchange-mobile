import { StyleSheet, View, Pressable } from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import AppSwitcher from '../AppSwitcher';
import AppText from '../AppText';
import colors from '../../constants/colors';
import AppInput from '../AppInput';
import Close from '../../assets/images/Close';
import Search from '../../assets/images/Search';

const BalanceSearchBar = ({
  setShowZeroBalances,
  type,
  value,
  showZeroBalances,
}) => {
  const animatedValue = useSharedValue(1000);

  const showButtonsHandler = () => {
    animatedValue.value = 0;
  };
  const hideButtonsHandler = () => {
    type('');
    animatedValue.value = 1000;
  };

  const inputStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(animatedValue.value, {
            duration: 700,
          }),
        },
      ],
    };
  });

  const Right = () => (
    <Pressable onPress={hideButtonsHandler} style={{ zIndex: 99 }}>
      <Close />
    </Pressable>
  );
  const toggleZeroBalances = () => setShowZeroBalances(!showZeroBalances);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.input, inputStyle]}>
        <AppInput
          placeholder="Search Coin"
          placeholderTextColor="rgba(105, 111, 142, 0.5)"
          onChangeText={type}
          right={<Right />}
          value={value}
        />
      </Animated.View>

      <View style={styles.hide}>
        <View style={styles.wrapper}>
          <AppSwitcher onToggle={toggleZeroBalances} isOn={!showZeroBalances} />
          <AppText body style={styles.secondary}>
            Hide Zero Balances
          </AppText>
        </View>
        <Pressable onPress={showButtonsHandler}>
          <Search style={styles.searchIcon} height={20} width={20} />
        </Pressable>
      </View>
    </View>
  );
};

export default BalanceSearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY_BACKGROUND,

    flex: 1,
  },
  input: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: 50,
    zIndex: 99,
    backgroundColor: colors.PRIMARY_BACKGROUND,
  },
  hide: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'space-between',
    flex: 1,
  },
  wrapper: {
    flexDirection: 'row',
    flex: 1,
  },
  searchInput: {
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 11,
    borderColor: colors.SECONDARY_PURPLE,
    zIndex: 1,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    marginLeft: 20,
  },
  selected: {
    backgroundColor: colors.SECONDARY_TEXT,
    borderRadius: 20,
    width: '75%',
    height: '75%',
  },
});
