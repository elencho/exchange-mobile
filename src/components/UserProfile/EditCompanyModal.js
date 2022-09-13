import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../AppModal';
import AppText from '../AppText';
import AppButton from '../AppButton';
import images from '../../constants/images';
import colors from '../../constants/colors';

export default function EditCompanyModal({ type = 'Company' }) {
  const dispatch = useDispatch();
  const companyInfoModalVisible = useSelector(
    (state) => state.modals.companyInfoModalVisible
  );

  const hide = () => dispatch({ type: 'TOGGLE_COMPANY_INFO_MODAL' });

  const children = (
    <View style={styles.container}>
      <Image source={images.Browser} />

      <AppText header style={styles.white}>
        Edit {type}
      </AppText>
      <AppText style={styles.secondary}>Edit {type} Text</AppText>

      <AppButton text="OK" style={styles.button} onPress={hide} />
    </View>
  );

  return (
    <AppModal
      hide={hide}
      bottom
      visible={companyInfoModalVisible}
      children={children}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 38,
    width: '54%',
  },
  container: {
    alignItems: 'center',
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    textAlign: 'center',
  },
  white: {
    color: colors.PRIMARY_TEXT,
    marginVertical: 16,
  },
});
