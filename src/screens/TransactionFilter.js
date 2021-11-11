import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

import Background from '../components/Background';
import ChooseCurrencyModal from '../components/TransactionFilter/ChooseCurrencyModal';
import TransactionFilterBottom from '../components/TransactionFilter/TransactionFilterBottom';
import FilterRow from '../components/TransactionHistory/FilterRow';
import Headline from '../components/TransactionHistory/Headline';

import { types, methods } from '../constants/filters';

export default function TransactionFilter({ navigation }) {
  const [visible, setVisible] = useState(false);

  const handleModal = () => {
    setVisible(!visible);
  };

  return (
    <Background>
      <Pressable
        style={styles.closeContainer}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require('../assets/images/Close.png')}
          style={styles.close}
        />
      </Pressable>

      <Headline title="Transaction Filter" />

      <Text style={styles.text}>Choose Type:</Text>
      <FilterRow array={types} />

      <Text style={styles.text}>Choose Methods:</Text>
      <FilterRow array={methods} multiselect />

      <Pressable style={styles.dropdown} onPress={handleModal}>
        <Text style={styles.bigText}>Show All Currency</Text>
        <Image source={require('../assets/images/Arrow.png')} />
      </Pressable>

      <Pressable
        style={[styles.dropdown, { marginVertical: 0, marginBottom: 15 }]}
      >
        <Text style={styles.greenText}>From Date</Text>
        <Image source={require('../assets/images/Calendar.png')} />
      </Pressable>
      <Pressable
        style={[styles.dropdown, { marginVertical: 0, marginBottom: 15 }]}
      >
        <Text style={styles.greenText}>To Date</Text>
        <Image source={require('../assets/images/Calendar.png')} />
      </Pressable>

      <TransactionFilterBottom />
      <ChooseCurrencyModal visible={visible} handleModal={handleModal} />
    </Background>
  );
}

const styles = StyleSheet.create({
  close: {
    width: 15,
    height: 15,
  },
  closeContainer: {
    position: 'absolute',
    top: 25,
    right: 25,
  },
  dropdown: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#42475D',
    marginVertical: 25,
  },
  text: {
    fontSize: 14,
    color: 'white',
    marginVertical: 15,
  },
  bigText: {
    fontSize: 17,
    color: 'white',
  },
  greenText: {
    fontSize: 17,
    color: '#696F8E',
  },
});
