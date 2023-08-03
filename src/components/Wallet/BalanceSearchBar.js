import { StyleSheet, View, Pressable, TextInput } from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import AppSwitcher from '../AppSwitcher';
import AppText from '../AppText';
import colors from '../../constants/colors';
import Close from '../../assets/images/Close';
import Search from '../../assets/images/Search';
import { IS_ANDROID } from '../../constants/system';

const BalanceSearchBar = ({
  setShowZeroBalances,
  type,
  value,
  showZeroBalances,
  animatedValue,
  hideButtonsHandler,
  showButtonsHandler,
}) => {
  const inputStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedValue.value}%`,
      borderWidth: 1,
      borderColor: interpolateColor(
        animatedValue.value,
        [8, 100],
        [colors.PRIMARY_BACKGROUND, colors.SECONDARY_PURPLE]
      ),
    };
  });

  const closeBtn = useAnimatedStyle(() => {
    return { opacity: interpolate(animatedValue.value, [8, 100], [0, 1]) };
  });

  const Right = () => (
    <Animated.View style={closeBtn}>
      <Pressable
        style={styles.searchIcon}
        hitSlop={50}
        onPress={hideButtonsHandler}
      >
        <Close />
      </Pressable>
    </Animated.View>
  );
  const toggleZeroBalances = () => setShowZeroBalances(!showZeroBalances);

  const Left = () => (
    <Pressable
      hitSlop={50}
      onPress={showButtonsHandler}
      style={{ zIndex: 100 }}
    >
      <Search height={20} width={20} />
    </Pressable>
  );
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.input, inputStyle]}>
        <Left />

        <TextInput
          style={styles.inputText}
          value={value}
          placeholder="Search Coin"
          placeholderTextColor="rgba(105, 111, 142, 0.5)"
          onChangeText={type}
        />

        <Right />
      </Animated.View>
      <View style={styles.wrapper}>
        <AppSwitcher onToggle={toggleZeroBalances} isOn={!showZeroBalances} />
        <AppText body style={styles.secondary}>
          Hide Zero Balances
        </AppText>
      </View>
    </View>
  );
};

export default BalanceSearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY_BACKGROUND,
    marginVertical: 30,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    position: 'absolute',
    flex: 1,
    right: 0,
    width: '100%',
    height: 44,
    paddingHorizontal: 22,
    zIndex: 99,
    backgroundColor: colors.PRIMARY_BACKGROUND,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapperBox: {
    height: 50,
  },
  hide: {
    flexDirection: 'row',
    alignItems: 'center',

    flex: 1,
  },
  wrapper: {
    flexDirection: 'row',
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
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
  searchIcon: {
    zIndex: 99,
  },
  inputText: {
    fontFamily: 'Ubuntu_Medium',
    fontSize: 14,
    lineHeight: IS_ANDROID ? 18 : null,
    flex: 1,
    color: colors.PRIMARY_TEXT,
    height: '100%',
    marginLeft: 14,
  },
});
