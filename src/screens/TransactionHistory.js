import React, { useEffect } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Background from '../components/Background';
import FilterIcon from '../components/TransactionHistory/FilterIcon';
import FilterRow from '../components/TransactionHistory/FilterRow';
import Headline from '../components/TransactionHistory/Headline';
import TopRow from '../components/TransactionHistory/TopRow';
import TransactionDate from '../components/TransactionHistory/TransactionDate';
import TransactionModal from '../components/TransactionHistory/TransactionModal';

import { bearer, types, URL, months } from '../constants/filters';
import { saveTransactions } from '../redux/transactions/actions';

export default function TransactionHistory({ navigation }) {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions);

  useEffect(() => {
    axios
      .get(URL, { headers: { Authorization: bearer } })
      .then((data) => dispatch(saveTransactions(data.data.data)))
      .catch((err) => console.log(err));
  }, []);

  const dates = transactions.map((tr) => {
    const date = new Date(tr.timestamp);
    return `${date.getDate()} ${
      months[date.getMonth()]
    }, ${date.getFullYear()}`;
  });

  const uniqueDates = [...new Set(dates)];

  const renderDate = ({ item }) => {
    return (
      <TransactionDate date={item} key={item} transactions={transactions} />
    );
  };

  return (
    <Background>
      {/* Top Row */}
      <TopRow />

      <Headline title="Transaction History" />

      {/* Filter Row */}
      <View style={styles.filter}>
        <FilterRow array={types} />
        <FilterIcon onPress={() => navigation.navigate('TransactionFilter')} />
      </View>

      {/* Transaction Scrollview */}
      <FlatList
        style={styles.transactions}
        data={uniqueDates}
        renderItem={renderDate}
        keyExtractor={(item) => item}
      />

      {/* Transaction Modal */}
      <TransactionModal />
    </Background>
  );
}

const styles = StyleSheet.create({
  transactions: {
    flex: 1,
    marginTop: 20,
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
