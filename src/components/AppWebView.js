import React from 'react';
import { TouchableOpacity, Modal, Image, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';

import images from '../constants/images';
import {
  toggleAddCardModal,
  toggleBuySellModal,
} from '../redux/modals/actions';
import {
  cardsSagaAction,
  setCard,
  setDepositProvider,
  setFee,
} from '../redux/trade/actions';

export default function AppWebView(props) {
  const { verifyCards, trade, deposit, cardsAdd, setStatusObj } = props;

  const dispatch = useDispatch();
  const webViewObj = useSelector((state) => state.modals.webViewObj);

  const closeWebView = () => {
    dispatch({ type: 'RESET_APP_WEBVIEW_OBJ' });
    if (verifyCards) {
      dispatch(cardsSagaAction());
      dispatch({
        type: 'SET_CARD_VERIFICATION_STATUS',
        cardBeingVerified: false,
      });
    }

    if (cardsAdd) {
      dispatch(toggleAddCardModal(false));
      dispatch(cardsSagaAction());
      setStatusObj({ success: 'false', visible: true });
    }

    if (trade) {
      dispatch(toggleBuySellModal(false));
      dispatch({ type: 'REFRESH_WALLET_AND_TRADES' });
    }

    if (deposit) {
      dispatch(setDepositProvider(null));
      dispatch(setCard(null));
      dispatch(setFee(null));
      dispatch({ type: 'SET_DEPOSIT_AMOUNT', depositAmount: null });
      dispatch({ type: 'BALANCE_SAGA' });
    }
  };

  return (
    <Modal
      presentationStyle="pageSheet"
      visible={!!webViewObj}
      animationType="slide"
    >
      <TouchableOpacity activeOpacity={0.99} style={styles.flex}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.close} onPress={closeWebView}>
            <Image source={images.Close} />
          </TouchableOpacity>
        </View>

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
    bottom: 10,
    right: 22,
    padding: 10,
  },
  flex: { flex: 1 },
  header: {
    backgroundColor: 'white',
    height: 66,
  },
});
