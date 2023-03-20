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

function TransactionFilterBottom() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const linkMain =
    'https://exchange.cryptal.com/exchange/api/v1/private/report/transactions/user';

  const showResults = () => {
    dispatch(showResultsAction(navigation));
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
      <View style={{ height: 80 }}>
        {loading ? (
          <MaterialIndicator
            color="#6582FD"
            size={25}
            animationDuration={3000}
            style={[{ marginVertical: 17, position: 'relative' }]}
          />
        ) : (
          <Pressable style={styles.download} onPress={downloadFile}>
            <Download />
            <PurpleText style={styles.purple} text="Download" />
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default TransactionFilterBottom;

const styles = StyleSheet.create({
  purple: {
    fontSize: 14,
    marginVertical: 30,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: colors.PRIMARY_PURPLE,
    paddingVertical: 15,
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 15,
    right: 15,
  },
  download: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  white: {
    fontSize: 14,
    color: colors.PRIMARY_TEXT,
  },
});
