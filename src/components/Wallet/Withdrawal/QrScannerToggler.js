import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import ScanSvg from '../../../assets/images/Wallet/Scan.svg';
import { toggleQrScannerModal } from '../../../redux/modals/actions';
import { useDispatch } from 'react-redux';

const QrScannerToggler = () => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => dispatch(toggleQrScannerModal(true))}
    >
      <ScanSvg />
    </TouchableOpacity>
  );
};

export default QrScannerToggler;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
