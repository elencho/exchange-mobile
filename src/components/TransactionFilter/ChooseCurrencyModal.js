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

import AppText from '../AppText';
import Currency from './Currency';

import {
  filterCurrencies,
  toggleCurrencyModal,
} from '../../redux/transactions/actions';
import { currencyList } from '../../constants/filters';

export default function ChooseCurrencyModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.transactions);

  const { currencyModal, currencies } = state;

  const renderCurrency = ({ item }) => (
    <Currency name={item.name} abbr={item.abbr} />
  );

  const closeModal = (evt) => {
    const { nativeEvent } = evt;
    if (nativeEvent.y > 150) {
      dispatch(toggleCurrencyModal(false));
    }
  };

  const filter = (text) => {
    const filteredArray = currencyList.filter((c) =>
      c.name.toLowerCase().includes(text.toLowerCase())
    );
    dispatch(filterCurrencies(filteredArray));
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
