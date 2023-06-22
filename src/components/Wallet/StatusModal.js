import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../AppModal';
import AppText from '../AppText';
import colors from '../../constants/colors';
import { setStatusModalInfo } from '../../redux/modals/actions';

import StatusError from '../../assets/images/Wallet/ErrorStatus.svg';
import StatusSuccess from '../../assets/images/Wallet/SuccessStatus.svg';

export default function StatusModal({ deposit, cards }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { statusModalInfo },
  } = state;

  const hide = () =>
    dispatch(setStatusModalInfo({ ...statusModalInfo, visible: false }));
  const onModalHide = () => dispatch(setStatusModalInfo(null));

  const text = () => {
    if (cards) return `card add header ${statusModalInfo?.success}`;
    if (deposit) return `deposit header ${statusModalInfo?.success}`;
  };
  const subtext = () => {
    if (cards) return `card add subtext ${statusModalInfo?.success}`;
    if (deposit) return `deposit subtext ${statusModalInfo?.success}`;
  };

  const visible = !!statusModalInfo?.visible;

  const children = (
    <View style={styles.container}>
      {statusModalInfo?.success === 'true' ? (
        <StatusSuccess />
      ) : (
        <StatusError />
      )}
      <AppText header style={styles.white}>
        {text()}
      </AppText>
      <AppText subtext style={styles.secondary}>
        {subtext()}
      </AppText>
    </View>
  );

  return (
    <AppModal
      children={children}
      hide={hide}
      bottom
      visible={visible}
      onModalHide={onModalHide}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 30,
  },
  secondary: {
    textAlign: 'center',
    color: colors.SECONDARY_TEXT,
    marginTop: 12,
  },
  white: {
    textAlign: 'center',
    color: colors.PRIMARY_TEXT,
    paddingTop: 30,
  },
});
