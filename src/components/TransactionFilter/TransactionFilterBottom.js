import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';

import AppText from '../AppText';
import colors from '../../constants/colors';
import { useDispatch } from 'react-redux';
import { showResultsAction } from '../../redux/transactions/actions';
import PurpleText from '../PurpleText';

function TransactionFilterBottom({ navigation }) {
  const dispatch = useDispatch();

  const showResults = () => {
    dispatch(showResultsAction(navigation));
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={showResults}>
        <AppText medium style={styles.white}>
          Show Result
        </AppText>
      </Pressable>

      <Pressable style={styles.download}>
        <Image source={require('../../assets/images/Download.png')} />
        <PurpleText style={styles.purple} text="Download" />
      </Pressable>
    </View>
  );
}

export default withNavigation(TransactionFilterBottom);

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
