import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../AppText';
import Currency from '../TransactionFilter/Currency';
import ModalTop from '../ModalTop';
import AppModal from '../AppModal';

import {
  fetchCurrencies,
  filterCurrencies,
} from '../../redux/transactions/actions';
import { toggleCryptoModal } from '../../redux/modals/actions';
import { fetchOffers, setCrypto } from '../../redux/trade/actions';
import colors from '../../constants/colors';
import images from '../../constants/images';

export default function CryptoModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  const {
    transactions: { currencies, currenciesConstant },
    modals: { cryptoModalVisible },
  } = state;

  const currenciesToIterate = currencies.filter(
    (c) => c.code !== '' && c.code !== 'GEL' && c.code !== 'USD'
  );
  const updatedConstants = currenciesConstant.filter(
    (c) => c.code !== '' && c.code !== 'GEL' && c.code !== 'USD'
  );

  const filter = (text) => {
    const filteredArray = updatedConstants.filter((c) =>
      c.name.toLowerCase().includes(text.toLowerCase())
    );
    dispatch(filterCurrencies(filteredArray));
  };

  const hide = () => {
    dispatch(toggleCryptoModal(false));
  };

  const choose = (code) => {
    dispatch(setCrypto(code));
    dispatch(filterCurrencies(updatedConstants));
    dispatch(fetchOffers());
    hide();
  };

  const children = (
    <View style={styles.container}>
      <ModalTop />

      <View style={styles.block}>
        <AppText medium style={styles.headline}>
          Choose Crypto
        </AppText>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Search Currency"
            placeholderTextColor="rgba(105, 111, 142, 0.5)"
            style={styles.input}
            onChangeText={filter}
          />
          <Image source={images.Search} />
        </View>

        <ScrollView>
          {currenciesToIterate.map((c) => (
            <Currency
              name={c.name}
              code={c.code}
              key={c.code}
              onPress={() => choose(c.code)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );

  return (
    <AppModal
      visible={cryptoModalVisible}
      hide={hide}
      children={children}
      custom
    />
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: colors.SECONDARY_BACKGROUND,
    padding: 40,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
  },
  headline: {
    fontSize: 20,
    color: colors.PRIMARY_TEXT,
  },
  inputContainer: {
    height: 45,
    borderWidth: 1,
    borderColor: '#3C4167',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  input: {
    height: '100%',
    fontSize: 15,
    color: colors.PRIMARY_TEXT,
    flex: 1,
    marginRight: 10,
  },
});
