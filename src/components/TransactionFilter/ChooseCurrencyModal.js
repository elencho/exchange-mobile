import React, { useEffect } from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Constants from 'expo-constants';

import AppText from '../AppText';
import Currency from './Currency';
import ModalTop from '../ModalTop';

import {
  fetchCurrencies,
  filterCurrencies,
} from '../../redux/transactions/actions';
import colors from '../../constants/colors';

export default function ChooseCurrencyModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  const { currencyModal, currencies } = state;

  const renderCurrency = ({ item }) => (
    <Currency name={item.name} code={item.code} />
  );

  const filter = (text) => {
    const filteredArray = currencies.filter((c) =>
      c.name.toLowerCase().includes(text.toLowerCase())
    );
    dispatch(filterCurrencies(filteredArray));
  };

  return (
    <Modal transparent animationType="slide" visible={currencyModal}>
      <View style={styles.container}>
        <ModalTop />

        <View style={styles.block}>
          <AppText medium style={styles.headline}>
            Choose Currency
          </AppText>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Search Currency"
              placeholderTextColor="rgba(105, 111, 142, 0.5)"
              style={styles.input}
              onChangeText={filter}
            />
            <Image source={require('../../assets/images/Search.png')} />
          </View>

          <FlatList
            data={currencies}
            renderItem={renderCurrency}
            keyExtractor={(item) => item.name}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: colors.SECONDARY_BACKGROUND,
    padding: 40,
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'rgba(15, 15, 31, 0.6)',
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
