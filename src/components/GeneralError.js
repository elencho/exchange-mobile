import React, { memo, useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import images from '../constants/images';
import AppText from './AppText';

function GeneralError({ style, show = true }) {
  const dispatch = useDispatch();
  const generalError = useSelector((state) => state.errors.generalError);
  const modals = useSelector((state) => state.modals);
  const trade = useSelector((state) => state.trade);
  const transactions = useSelector((state) => state.transactions);
  const wallet = useSelector((state) => state.wallet);
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    if (generalError) {
      dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null });
    }
  }, [modals, trade, transactions, wallet, profile]);

  return (
    <>
      {generalError && show ? (
        <View style={[styles.container, style]}>
          <Image source={images.General_Error} />
          <AppText subtext style={styles.red}>
            {generalError?.errorMessage}
          </AppText>
        </View>
      ) : null}
    </>
  );
}

export default memo(GeneralError);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(244, 94, 140, 0.08)',
    paddingVertical: 8,
    paddingHorizontal: 17,
    width: '100%',
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },
  red: {
    color: '#F45E8C',
    flex: 1,
    marginLeft: 13,
    lineHeight: 16,
  },
});
