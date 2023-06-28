import { StyleSheet, Pressable, View, Image } from 'react-native';
import React from 'react';
import FilterIcon from '../FilterIcon';
import DownloadIcon from '../DownloadIcon';
import CurrencyDropdowns from '../../InstantTrade/CurrencyDropdowns';
import { useDispatch, useSelector } from 'react-redux';
import { COINS_URL_PNG } from '../../../constants/api';
import AppText from '../../AppText';
import Arrow from '../../../assets/images/Arrow.svg';
import { toggleCurrencyModal } from '../../../redux/modals/actions';
import colors from '../../../constants/colors';
import ChooseCurrencyModal from '../../TransactionFilter/ChooseCurrencyModal';

const SearchAndFilter = ({ navigation }) => {
  const dispatch = useDispatch();
  const { code, currency } = useSelector((state) => state.transactions);

  const openModal = () => dispatch(toggleCurrencyModal(true));
  const seperateCurrencyName = (currency) => currency.split('(')[0];

  return (
    <View style={styles.container}>
      <Pressable style={styles.dropdown} onPress={openModal}>
        {
          <Image
            source={{ uri: `${COINS_URL_PNG}/${code?.toLowerCase()}.png` }}
            style={styles.coin}
          />
        }
        <AppText body medium style={styles.dropdownText}>
          {seperateCurrencyName(currency) || 'Choose coin'}
        </AppText>
        <Arrow />
      </Pressable>

      <FilterIcon onPress={() => navigation.navigate('TransactionFilter')} />
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
    paddingHorizontal: 20,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#42475D',
    flex: 1,
    marginTop: 10,
  },
  dropdownText: {
    color: colors.PRIMARY_TEXT,
    flex: 1,
  },
});
