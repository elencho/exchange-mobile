import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import AppText from './AppText';
import AppInput from './AppInput';
import WithKeyboard from './WithKeyboard';
import ModalTop from './ModalTop';
import ModalSearchItem from './ModalSearchItem';
import Search from '../assets/images/Search';
import SearchActive from '../assets/images/Search_Active';

import colors from '../constants/colors';
import { COINS_URL_PNG, COUNTRIES_URL_PNG } from '../constants/api';

export default function ModalWithSearch({
  array,
  filter,
  choose,
  currentItem,
  crypto = false,
  title,
  phoneCountry,
  countryDrop,
  citizenshipDrop,
  tradeType,
}) {
  const handlePress = (name, code) => {
    crypto ? choose(code) : choose(name, code);
  };

  const uri = (code) => {
    return title === 'Choose Currency'
      ? `${COINS_URL_PNG}/${code.toLowerCase()}.png`
      : `${COUNTRIES_URL_PNG}/${code}.png`;
  };

  const searchItem = ({ item }) => {
    const name =
      item?.name ||
      item?.pair?.baseCurrencyName ||
      `${item?.available} ${item?.currencyCode}`;

    const code = item?.code || item?.pair?.baseCurrency || item?.currencyCode;
    const totalPrice = tradeType === 'Buy' ? item?.buyPrice : item?.sellPrice;
    const currency = item?.pair?.quoteCurrency;

    const totalTradePrice =
      item?.pair?.baseCurrencyName && `${totalPrice} ${currency}`;
    const totalAvailablePrice =
      item?.valueUSD && `Total: ${item?.total} = ${item?.valueUSD} USD`;

    return (
      <ModalSearchItem
        name={name}
        code={code}
        phoneCode={item?.phoneCode}
        currentItem={currentItem}
        canShowCode={!item?.currencyCode}
        onPress={() => handlePress(name, code)}
        uri={uri(code)}
        phoneCountry={phoneCountry}
        countryDrop={countryDrop}
        citizenshipDrop={citizenshipDrop}
        total={totalTradePrice || totalAvailablePrice}
      />
    );
  };
  return (
    <View style={styles.container}>
      <ModalTop />

      <View style={styles.block}>
        <AppText header style={styles.headline}>
          {title}
        </AppText>

        <AppInput
          placeholder={title.replace('Choose', 'Search')}
          placeholderTextColor="rgba(105, 111, 142, 0.5)"
          onChangeText={filter}
          right={<Search />}
          activeRight={<SearchActive />}
          style={{ marginVertical: 20, marginHorizontal: 39 }}
        />

        <WithKeyboard padding flexGrow>
          <FlatList
            data={array}
            renderItem={searchItem}
            keyExtractor={({ item }) =>
              item?.code || item?.pair?.baseCurrency || item?.currencyCode
            }
            scrollEventThrottle={1000}
            initialNumToRender={25}
          />
        </WithKeyboard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: colors.SECONDARY_BACKGROUND,
    paddingTop: 40,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
  },
  headline: {
    color: colors.PRIMARY_TEXT,
    marginBottom: -10,
    marginHorizontal: 40,
  },
});
