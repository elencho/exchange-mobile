import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import images from '../constants/images';
import { saveGeneralError } from '../redux/profile/actions';
import AppText from './AppText';

export default function GeneralError({ style }) {
  const dispatch = useDispatch();
  const generalError = useSelector((state) => state.profile.generalError);

  useEffect(() => {
    return () => {
      dispatch(saveGeneralError(null));
    };
  }, []);

  return (
    <>
      {generalError ? (
        <View style={[styles.container, style]}>
          <Image source={images.General_Error} />
          <AppText subtext style={styles.red}>
            {generalError}
          </AppText>
        </View>
      ) : null}
    </>
  );
}

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
