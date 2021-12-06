import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import colors from '../../constants/colors';
import { toggleBuySellModal } from '../../redux/modals/actions';
import AppText from '../AppText';

export default function ReadyTrades() {
  const dispatch = useDispatch();

  const handleTrade = (t) => {
    dispatch(toggleBuySellModal(true));
  };

  return (
    <View style={styles.container}>
      {[50, 200, 500, 'Custom'].map((t) => (
        <Pressable style={styles.block} key={t} onPress={() => handleTrade(t)}>
          <AppText style={styles.primary} header>
            {t} <AppText body>{t !== 'Custom' && 'GEL'}</AppText>
          </AppText>
          <AppText body subtext style={styles.secondary}>
            {t !== 'Custom' ? '0.000256 BTC' : 'Your Amount'}
          </AppText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    borderWidth: 0.5,
    borderColor: 'rgba(101, 130, 253, 0.3)',
    padding: 20,
    width: '47%',
    marginBottom: '6%',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  primary: {
    color: colors.PRIMARY_TEXT,
    marginBottom: 10,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
  },
});
