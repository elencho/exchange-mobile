import { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Pressable } from 'react-native';
import AppModal from './AppModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  grantCameraPermission,
  toggleQrScannerModal,
} from '../redux/modals/actions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Close from '../assets/images/Close.svg';

const QrScanner = ({ setAddress }) => {
  const hasPermission = useSelector(
    (state) => state.modals.hasCameraPermission
  );

  const dispatch = useDispatch();
  const closeQrScannerModal = () => dispatch(toggleQrScannerModal(false));
  const hide = () => {
    closeQrScannerModal();
  };
  const isModalVisible = useSelector(
    (state) => state.modals.qrScannerModalVisible
  );

  const children = () => (
    <View style={styles.container}>
      <Pressable hitSlop={200} style={styles.btn} onPress={hide}>
        <Close />
      </Pressable>
      <View style={styles.barCodeBox}>
        <BarCodeScanner
          barCodeSize={{ height: 300, width: 100 }}
          onBarCodeScanned={handleBarCodeScanned}
          style={styles.camera}
        />
      </View>
    </View>
  );

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      dispatch(grantCameraPermission(status === 'granted'));
      return status;
    };

    isModalVisible &&
      !hasPermission &&
      getBarCodeScannerPermissions().then((status) => {
        if (status === 'denied') {
          closeQrScannerModal();
          return Alert.alert('', 'You need to enable camera permissions');
        }
      });
  }, [isModalVisible]);

  const handleBarCodeScanned = ({ type, data }) => {
    setAddress(data);
    closeQrScannerModal();
  };

  return (
    <AppModal
      visible={hasPermission && isModalVisible}
      hide={hide}
      children={children()}
      title="QR Scanner"
      custom
    />
  );
};

export default QrScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: 300,
    width: 300,
    alignSelf: 'center',
  },
  barCodeBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    alignSelf: 'flex-end',
    margin: 20,
  },
});
