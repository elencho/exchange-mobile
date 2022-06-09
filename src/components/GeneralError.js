import React, { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import images from '../constants/images';
import AppText from './AppText';

function GeneralError({ style }) {
  const generalError = useSelector((state) => state.profile.generalError);

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
