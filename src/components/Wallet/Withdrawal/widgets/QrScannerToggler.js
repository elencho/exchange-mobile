import React from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { BarCodeScanner } from 'expo-barcode-scanner';

import ScanSvg from '../../../../assets/images/Wallet/Scan.svg';
import {
  grantCameraPermission,
  toggleQrScannerModal,
} from '../../../../redux/modals/actions';

const QrScannerToggler = () => {
  const dispatch = useDispatch();

  const handlePress = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    dispatch(grantCameraPermission(status === 'granted'));
    if (status === 'granted') {
      dispatch(toggleQrScannerModal(true));
    } else {
      Alert.alert('', 'You need to enable camera permissions');
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <ScanSvg />
    </TouchableOpacity>
  );
};

export default QrScannerToggler;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingRight: 0,
  },
});
