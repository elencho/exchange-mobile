import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  toggleEmailAuthModal,
  toggleSmsAuthModal,
} from '../../redux/modals/actions';
import colors from '../../constants/colors';
import AppModal from '../AppModal';
import AppText from '../AppText';
import PurpleText from '../PurpleText';
import CodeInput from '../CodeInput';

export default function SmsEmailAuthModal({ type }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.modals);
  const { smsAuthModalVisible, emailAuthModalVisible } = state;

  const visible = type === 'SMS' ? smsAuthModalVisible : emailAuthModalVisible;
  const action =
    type === 'SMS' ? toggleSmsAuthModal(false) : toggleEmailAuthModal(false);
  const cellCount = type === 'SMS' ? 4 : 6;

  const hide = () => dispatch(action);

  const children = (
    <View style={styles.container}>
      <AppText style={styles.header} header>
        {type} Authentication
      </AppText>
      <AppText style={styles.secondary} body>
        Enter One Time Password
      </AppText>

      <View style={styles.codeInput}>
        <CodeInput cellCount={cellCount} />
      </View>

      <AppText body style={styles.secondary}>
        Didn't receive code? <PurpleText text="Resend" />
      </AppText>
    </View>
  );

  return <AppModal children={children} bottom hide={hide} visible={visible} />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  codeInput: {
    marginVertical: 35,
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
