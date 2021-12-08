import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppText from '../AppText';
import Currency from './Currency';
import ModalTop from '../ModalTop';
import AppModal from '../AppModal';

import {
  fetchCurrencies,
  filterCurrencies,
} from '../../redux/transactions/actions';
import colors from '../../constants/colors';
import { toggleCurrencyModal } from '../../redux/modals/actions';
import images from '../../constants/images';

export default function ChooseCurrencyModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.transactions);
  const chooseCurrencyModalVisible = useSelector(
    (state) => state.modals.chooseCurrencyModalVisible
  );

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  const { currencies, currenciesConstant } = state;

  const filter = (text) => {
    const filteredArray = currenciesConstant.filter((c) =>
      c.name.toLowerCase().includes(text.toLowerCase())
    );
    dispatch(filterCurrencies(filteredArray));
  };

  const hide = () => {
    dispatch(toggleCurrencyModal(false));
  };

  return (
    <AppModal visible={chooseCurrencyModalVisible} hide={hide}>
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
            <Image source={images.Search} />
          </View>

          <ScrollView /* style={{ height: 400 }} */>
            {currencies.map((c) => (
              <Currency name={c.name} code={c.code} key={c.code} />
            ))}
          </ScrollView>
        </View>
      </View>
    </AppModal>
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
