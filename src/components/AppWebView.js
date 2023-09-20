import React from 'react';
import {
  TouchableOpacity,
  Modal,
  StyleSheet,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Close from '../assets/images/Close.svg';
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
  const { verifyCards, trade, deposit, cardsAdd } = props;

  const dispatch = useDispatch();
  const webViewObj = useSelector((state) => state.modals.webViewObj);

  const closeWebView = async () => {
    await AsyncStorage.removeItem('webViewVisible');
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

  const handleOnShow = async () => {
    await AsyncStorage.setItem('webViewVisible', `${!!webViewObj}`);
  };

  const handleOnRequestClose = async () => {
    await AsyncStorage.removeItem('webViewVisible');
  };

  return (
    <Modal
      statusBarTranslucent={true}
      presentationStyle="fade"
      visible={!!webViewObj}
      onShow={handleOnShow}
      onRequestClose={handleOnRequestClose}
      animationType="slide"
    >
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle="dark-content"
      />
      <TouchableOpacity activeOpacity={0.99} style={styles.flex}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.close} onPress={closeWebView}>
            <Close />
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
    alignSelf: 'flex-end',
    marginRight: 25,
    marginTop: Platform.select({ ios: 20, android: 10 }),
  },
  flex: { flex: 1 },
  header: {
    backgroundColor: 'white',
    height: 66,
    paddingTop: 30,
    paddingBottom: 30,
  },
});
