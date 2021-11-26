import React, { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Modalize } from 'react-native-modalize';
import Constants from 'expo-constants';

import { setModalRef } from '../redux/transactions/actions';

export default function AppModal({ children, adjust = false }) {
  let modalRef;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setModalRef(modalRef));
  }, []);

  return (
    <Modalize
      modalStyle={[
        styles.modalStyle,
        Platform.OS === 'ios' && { marginTop: Constants.statusBarHeight },
      ]}
      ref={(ref) => (modalRef = ref)}
      withHandle={false}
      withReactModal
      adjustToContentHeight={adjust}
      threshold={25}
    >
      {children}
    </Modalize>
  );
}

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0)',
  },
});
