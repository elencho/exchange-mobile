import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { useDispatch } from 'react-redux';
import { showResultsAction } from '../../redux/transactions/actions';
import { generateFile } from '../../utils/walletUtils';
import PurpleText from '../PurpleText';

import { MaterialIndicator } from 'react-native-indicators';
import Download from '../../assets/images/Download';
import { fetchTrades } from '../../redux/trade/actions';
import { IS_ANDROID } from '../../constants/system';

function TransactionFilterBottom({ navigation, isInstantTrade }) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const linkMain =
    'https://exchange.cryptal.com/exchange/api/v1/private/report/transactions/user';

  const showResults = () => {
    isInstantTrade
      ? dispatch(fetchTrades())
      : dispatch(showResultsAction(navigation));
    navigation.navigate('Main', {
      screen: 'Transactions',
      params: { isFromTransactions: true },
    });
  };

  const downloadFile = () => {
    generateFile(linkMain, setLoading, 'transactions', 'xlsx');
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={showResults}>
        <AppText medium style={styles.white}>
          Show Result
        </AppText>
      </Pressable>
    </View>
  );
}

export default TransactionFilterBottom;

const styles = StyleSheet.create({
  purple: {
    fontSize: 14,
    lineHeight: 18,
    marginVertical: 30,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: colors.PRIMARY_PURPLE,
    paddingVertical: 15,
    alignItems: 'center',
  },
  container: {
    marginBottom: IS_ANDROID ? 18 : 28,
  },
  download: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  white: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.PRIMARY_TEXT,
  },
});
