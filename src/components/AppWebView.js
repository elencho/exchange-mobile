import React from 'react';
import { TouchableOpacity, Modal, Image, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';

import images from '../constants/images';
import { cardsSagaAction } from '../redux/trade/actions';

export default function AppWebView(props) {
  const dispatch = useDispatch();
  const webViewObj = useSelector((state) => state.modals.webViewObj);

  const closeWebView = () => {
    dispatch({ type: 'RESET_APP_WEBVIEW_OBJ' });
    if (props.refresh) dispatch(cardsSagaAction());
  };

  return (
    <Modal
      presentationStyle="pageSheet"
      visible={!!webViewObj}
      animationType="slide"
    >
      <TouchableOpacity activeOpacity={0.99} style={styles.flex}>
        <TouchableOpacity style={styles.close} onPress={closeWebView}>
          <Image source={images.Close} />
        </TouchableOpacity>
        <WebView
          nestedScrollEnabled
          originWhitelist={['*']}
          allowsFullscreenVideo
          allowsInlineMediaPlayback
          allowFileAccess
          allowFileAccessFromFileURLs
          allowUniversalAccessFromFileURLs
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          {...props}
        />
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    top: 30,
    right: 30,
    zIndex: 100,
    backgroundColor: 'rgba(230,230,230,0.5)',
    padding: 10,
    borderRadius: 30,
  },
  flex: { flex: 1 },
});
