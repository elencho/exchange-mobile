import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppInput from '../../AppInput';
import Search from '../../../assets/images/Search';
import FilterIcon from '../FilterIcon';
import DownloadIcon from '../DownloadIcon';

const SearchAndFilter = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AppInput
        placeholder="Search by TXID"
        right={<Search />}
        style={styles.searchInput}
      />
      <FilterIcon onPress={() => navigation.navigate('TransactionFilter')} />
      <DownloadIcon />
    </View>
  );
};

export default SearchAndFilter;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchInput: {
    flex: 1,
  },
});
