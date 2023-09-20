import { StyleSheet, View, Image, Keyboard } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import FilterIcon from '../FilterIcon';
import DownloadIcon from '../DownloadIcon';
import { useDispatch, useSelector } from 'react-redux';
import { COINS_URL_PNG } from '../../../constants/api';
import { toggleCryptoModal } from '../../../redux/modals/actions';
import colors from '../../../constants/colors';
import ChooseCurrencyModal from '../../TransactionFilter/ChooseCurrencyModal';
import AppDropdown from '../../AppDropdown';
import AppInput from '../../AppInput';
import Search from '../../../assets/images/Search';
import {
  saveTransactions,
  setTransactionSearch,
  setTransactionsOffset,
  showResultsAction,
} from '../../../redux/transactions/actions';
import CryptoModalTrade from '../../InstantTrade/CryptoModalTrade';
import {
  fetchTrades,
  saveTrades,
  setCryptoCodeQuery,
} from '../../../redux/trade/actions';

const SearchAndFilter = ({ isInstantTrade, navigation }) => {
  const dispatch = useDispatch();
  const { cryptoCodeQuery } = useSelector((state) => state.trade);
  const { cryptoCodeTransactions, txIdOrRecipient } = useSelector(
    (state) => state.transactions
  );
  const [searchValue, setSearchValue] = useState('');
  const openModal = () => dispatch(toggleCryptoModal(true));
  const seperateCurrencyName = (currency) => currency.split('(')[0];
  const clearCurrencyDropdown = () => {
    dispatch(setCryptoCodeQuery(null));
    dispatch(saveTrades([]));
    dispatch(fetchTrades());
  };

  //debounce
  useEffect(() => {
    const getSearchedData = setTimeout(() => {
      dispatch(setTransactionsOffset(0));
      dispatch(saveTransactions([]));
      dispatch(setTransactionSearch(searchValue));
      dispatch(showResultsAction(navigation));
    }, 1000);

    return () => clearTimeout(getSearchedData);
  }, [searchValue]);

  useEffect(() => {
    if (!txIdOrRecipient) setSearchValue('');
  }, [txIdOrRecipient]);

  const cryptoCode = isInstantTrade ? cryptoCodeQuery : cryptoCodeTransactions;
  return (
    <View style={styles.container}>
      {isInstantTrade ? (
        <AppDropdown
          handlePress={openModal}
          handleClear={clearCurrencyDropdown}
          style={styles.dropdown}
          selectedText={
            cryptoCode?.length > 0 && seperateCurrencyName(cryptoCode)
          }
          label="Choose Crypto"
          icon={
            cryptoCode &&
            cryptoCode !== 'Show all currency' && (
              <Image
                source={{
                  uri: `${COINS_URL_PNG}/${cryptoCode?.toLowerCase()}.png`,
                }}
                style={styles.coin}
              />
            )
          }
        />
      ) : (
        <AppInput
          style={styles.searchInput}
          placeholder="Search by TXID"
          right={<Search />}
          value={searchValue}
          isSearch
          onChangeText={(text) => setSearchValue(text)}
          labelBackgroundColor={colors.PRIMARY_BACKGROUND}
          handleClear={() => {
            setSearchValue('');
          }}
        />
      )}

      <FilterIcon
        isInstantTrade={isInstantTrade}
        onPress={() => {
          navigation.navigate('TransactionFilter', { isInstantTrade });
          Keyboard.dismiss();
        }}
      />
      <DownloadIcon />
      <ChooseCurrencyModal isForTransactions />
      <CryptoModalTrade />
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
  },
});
