import { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Pressable } from 'react-native';
import AppModal from './AppModal';
import { useDispatch, useSelector } from 'react-redux';
import { toggleQrScannerModal } from '../redux/modals/actions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Close from '../assets/images/Close.svg';

const QrScanner = ({ setAddress }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

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
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
        />
      </View>
    </View>
  );

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setAddress(data);
    closeQrScannerModal();
  };

  if (hasPermission === false && isModalVisible === true) {
    return Alert.alert('', 'You need to enable camera permissions');
  }

  return (
    <AppModal
      visible={isModalVisible}
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
