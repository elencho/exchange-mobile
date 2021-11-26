import React, { useEffect } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

import AppText from '../AppText';
import Currency from './Currency';
import ModalTop from '../ModalTop';
import AppModal from '../AppModal';

import {
  fetchCurrencies,
  filterCurrencies,
} from '../../redux/transactions/actions';
import colors from '../../constants/colors';

export default function ChooseCurrencyModal() {
  const height = useSafeAreaFrame().height;

  const dispatch = useDispatch();
  const state = useSelector((state) => state.transactions);

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

  return (
    <AppModal>
      <View style={{ height }}>
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
