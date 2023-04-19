import { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import AppModal from './AppModal';
import { useDispatch, useSelector } from 'react-redux';
import { toggleQrScannerModal } from '../redux/modals/actions';
import { BarCodeScanner } from 'expo-barcode-scanner';

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
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
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

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
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
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
