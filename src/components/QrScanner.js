import { AppRegistry, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AppModal from './AppModal';
import { useDispatch, useSelector } from 'react-redux';
import { toggleQrScannerModal } from '../redux/modals/actions';

const QrScanner = ({ setAddress }) => {
  const dispatch = useDispatch();
  const closeQrScannerModal = () => dispatch(toggleQrScannerModal(false));
  const hide = () => {
    closeQrScannerModal();
  };
  const isModalVisible = useSelector(
    (state) => state.modals.qrScannerModalVisible
  );

  const onSuccess = (e) => {
    setAddress(e.data);
    closeQrScannerModal();
  };

  const children = () => (
    <QRCodeScanner
      onRead={onSuccess}
      showMarker={true}
      markerStyle={styles.marker}
    />
  );

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
  marker: {
    borderColor: '#25D8D1',
    borderWidth: 2,
  },
});

AppRegistry.registerComponent('default', () => ScanScreen);
