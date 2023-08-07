import { StyleSheet, Pressable, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import FilterIcon from '../FilterIcon';
import DownloadIcon from '../DownloadIcon';
import CurrencyDropdowns from '../../InstantTrade/CurrencyDropdowns';
import { useDispatch, useSelector } from 'react-redux';
import { COINS_URL_PNG } from '../../../constants/api';
import { toggleCurrencyModal } from '../../../redux/modals/actions';
import colors from '../../../constants/colors';
import ChooseCurrencyModal from '../../TransactionFilter/ChooseCurrencyModal';
import AppDropdown from '../../AppDropdown';
import AppInput from '../../AppInput';
import Search from '../../../assets/images/Search';
import { currencyAction } from '../../../redux/transactions/actions';

const SearchAndFilter = ({ navigation, isInstantTrade }) => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const { code, currency } = useSelector((state) => state.transactions);

  const openModal = () => dispatch(toggleCurrencyModal(true));
  const seperateCurrencyName = (currency) => currency.split('(')[0];
  const clearCurrencyDropdown = () =>
    dispatch(currencyAction('Show All Currency', [], null));

  //debounce
  useEffect(() => {
    const getSearchedData = setTimeout(() => {}, 1500);

    return () => clearTimeout(getSearchedData);
  }, [searchValue]);

  return (
    <View style={styles.container}>
      {isInstantTrade ? (
        <AppInput
          style={styles.searchInput}
          label="Search by TXID"
          right={<Search />}
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
        />
      ) : (
        <AppDropdown
          handlePress={openModal}
          handleClear={clearCurrencyDropdown}
          style={styles.dropdown}
          selectedText={seperateCurrencyName(currency)}
          activeLabel="Show All Currency"
          icon={
            code && (
              <Image
                source={{ uri: `${COINS_URL_PNG}/${code?.toLowerCase()}.png` }}
                style={styles.coin}
              />
            )
          }
        />
      )}

      <FilterIcon
        onPress={() =>
          navigation.navigate('TransactionFilter', { isInstantTrade })
        }
      />
      <DownloadIcon />
      <ChooseCurrencyModal isForTransactions />
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
  dropdown: {
    marginTop: 10,
    flex: 1,
  },
  searchInput: {
    flex: 1,
  },
  dropdownText: {
    color: colors.PRIMARY_TEXT,
    flex: 1,
  },
  coin: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
});