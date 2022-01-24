import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import { toggleGoogleOtpModal } from '../../redux/modals/actions';
import { setGoogleAuth } from '../../redux/profile/actions';
import AppModal from '../AppModal';
import AppText from '../AppText';
import CodeInput from '../CodeInput';

export default function GoogleOtpModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.modals);
  const { googleOtpModalVisible } = state;

  const [value, setValue] = useState('');
  useEffect(() => {
    if (value.length === 6) {
      dispatch(toggleGoogleOtpModal(false));
      dispatch(setGoogleAuth(false));
    }
  }, [value]);

  const handleChange = (text) => setValue(text);
  const hide = () => dispatch(toggleGoogleOtpModal(false));

  const children = (
    <View style={styles.container}>
      <AppText style={styles.header} header>
        Google Authentication
      </AppText>
      <AppText style={styles.secondary} body>
        Enter One Time Password
      </AppText>

      <View style={styles.codeInput}>
        <CodeInput cellCount={6} value={value} setValue={handleChange} />
      </View>
    </View>
  );

  return (
    <AppModal
      children={children}
      bottom
      hide={hide}
      visible={googleOtpModalVisible}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  codeInput: {
    marginTop: 35,
  },
  header: {
    color: colors.PRIMARY_TEXT,
    marginBottom: 10,
  },
  secondary: {
    color: colors.SECONDARY_TEXT,
    fontSize: 24,
  },
});
