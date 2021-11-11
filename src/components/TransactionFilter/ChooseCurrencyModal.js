import React from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCurrencyModal } from '../../redux/transactions/actions';

import AppText from '../AppText';
import Currency from './Currency';

const currencies = [
  { name: 'Show All Currency', abbr: '' },
  { name: 'Bitcoin', abbr: 'BTC' },
  { name: 'Ethereum', abbr: 'ETH' },
  { name: 'ZCash', abbr: 'ZEC' },
  { name: 'Bitcoin Cash', abbr: 'BCH' },
  { name: 'Dash', abbr: 'Dash' },
  { name: 'Litecoin', abbr: 'LTC' },
  { name: 'Bitcoin1', abbr: 'BTC' },
  { name: 'Ethereum1', abbr: 'ETH' },
  { name: 'ZCash1', abbr: 'ZEC' },
  { name: 'Bitcoin Cash1', abbr: 'BCH' },
  { name: 'Dash1', abbr: 'Dash' },
  { name: 'Litecoin1', abbr: 'LTC' },
  { name: 'Bitcoin2', abbr: 'BTC' },
  { name: 'Ethereum2', abbr: 'ETH' },
  { name: 'ZCash2', abbr: 'ZEC' },
  { name: 'Bitcoin Cash2', abbr: 'BCH' },
  { name: 'Dash2', abbr: 'Dash' },
  { name: 'Litecoin2', abbr: 'LTC' },
];

export default function ChooseCurrencyModal() {
  const dispatch = useDispatch();
  const currencyModal = useSelector(
    (state) => state.transactions.currencyModal
  );

  const renderCurrency = ({ item }) => (
    <Currency name={item.name} abbr={item.abbr} />
  );

  const closeModal = (evt) => {
    const { nativeEvent } = evt;
    if (nativeEvent.y > 150) {
      dispatch(toggleCurrencyModal(false));
    }
  };

  return (
    <Modal
      animationType="slide"
      visible={currencyModal}
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <PanGestureHandler onGestureEvent={closeModal}>
          <View style={styles.top}>
            <View style={styles.line} />
          </View>
        </PanGestureHandler>

        <View style={styles.block}>
          <AppText medium style={styles.headline}>
            Choose Currency
          </AppText>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Search Currency"
              placeholderTextColor="rgba(105, 111, 142, 0.5)"
              style={styles.input}
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
    backgroundColor: '#1F1F35',
    padding: 40,
  },
  container: {
    flex: 1,
  },
  headline: {
    fontSize: 20,
    color: 'white',
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
    color: 'white',
    flex: 1,
    marginRight: 10,
  },
  line: {
    height: 7,
    width: '25%',
    backgroundColor: '#1F1F35',
  },
  top: {
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 15, 31, 1)',
  },
});
