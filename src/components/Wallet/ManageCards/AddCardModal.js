import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../../AppModal';
import AppText from '../../AppText';
import AppButton from '../../AppButton';
import AppWebView from '../../AppWebView';
import AppInfoBlock from '../../AppInfoBlock';
import PurpleText from '../../PurpleText';
import ChooseBankModal from '../../InstantTrade/ChooseBankModal';
import BankFeesModal from '../../InstantTrade/BankFeesModal';
import images from '../../../constants/images';
import colors from '../../../constants/colors';
import {
  setCardAddStatusModalInfo,
  toggleAddCardModal,
  toggleBankFeesModal,
  toggleChooseBankModal,
} from '../../../redux/modals/actions';
import { addCard } from '../../../utils/walletUtils';

export default function AddCardModal() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    modals: { addCardModalVisible, cardAddStatusModalInfo, webViewObj },
    trade: { depositProvider, depositProviders },
    transactions: { code },
  } = state;

  const [saveCardAgreeTerms, setSaveCardAgreeTerms] = useState(false);

  const hide = () => dispatch(toggleAddCardModal(false));

  const image = () =>
    saveCardAgreeTerms ? images.Check_Full : images.Check_Empty;
  const toggle = () => setSaveCardAgreeTerms(!saveCardAgreeTerms);
  const showBanks = () => dispatch(toggleChooseBankModal(true));
  const showFees = () => dispatch(toggleBankFeesModal(true));
  const multipleBanks = () => depositProviders.length > 1;

  const handleAddCard = async () => {
    const params = {
      currency: code,
      redirectUri: 'cryptal.com',
      provider: depositProvider,
    };
    const webViewObj = await addCard(params);
    dispatch({ type: 'SET_APP_WEBVIEW_OBJ', webViewObj });
  };

  const onNavigationStateChange = (state) => {
    const urlArray = state.url.split('=');
    const ending = urlArray[urlArray.length - 1];
    if (ending === 'false' || ending === 'true') {
      dispatch(setCardAddStatusModalInfo({ success: ending }));
      dispatch({ type: 'REFRESH_WALLET_AND_TRADES' });
      dispatch({ type: 'RESET_APP_WEBVIEW_OBJ' });
      hide();
    }
  };

  const handleHide = () => {
    if (cardAddStatusModalInfo) {
      dispatch(
        setCardAddStatusModalInfo({ ...cardAddStatusModalInfo, visible: true })
      );
    }
  };

  const urlEncodedData = () => {
    const data = new URLSearchParams(webViewObj?.data);
    return data.toString();
  };

  const color = depositProvider ? colors.PRIMARY_TEXT : colors.SECONDARY_TEXT;

  const children = (
    <>
      {multipleBanks() ? (
        <>
          <Pressable style={styles.dropdown} onPress={showBanks}>
            <AppText style={[styles.text, { color }]} medium={depositProvider}>
              {depositProvider ? depositProvider : 'Payment Service Provider'}
            </AppText>
            <Image source={images['Arrow']} />
          </Pressable>

          <AppText subtext style={styles.subText}>
            100 ₾-500 ₾ Visa / MC Card 4% Amex 6 %{' '}
            <PurpleText text=" See More" onPress={showFees} />
          </AppText>
        </>
      ) : (
        <AppText style={styles.grey}>
          See card processor <PurpleText text="Show Fees" onPress={showFees} />
        </AppText>
      )}

      <AppInfoBlock content={['Add Card Info']} info />

      <View style={styles.row}>
        <Pressable style={styles.image} onPress={toggle}>
          <Image source={image()} style={{ marginRight: 10 }} />
        </Pressable>
        <AppText style={styles.grey}>
          Save Card & Agree <PurpleText text="Terms" />
        </AppText>
      </View>

      <AppButton
        text="Next"
        style={styles.button}
        disabled={!saveCardAgreeTerms}
        onPress={handleAddCard}
      />

      <ChooseBankModal />
      <BankFeesModal />

      {webViewObj?.actionMethod === 'POST' && (
        <AppWebView
          onNavigationStateChange={onNavigationStateChange}
          source={{
            uri: webViewObj?.actionUrl,
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: urlEncodedData(),
          }}
        />
      )}

      {webViewObj?.actionMethod === 'GET' && (
        <AppWebView
          onNavigationStateChange={onNavigationStateChange}
          source={{ uri: webViewObj?.actionUrl }}
        />
      )}
    </>
  );

  return (
    <AppModal
      children={children}
      title="Add Card"
      fullScreen
      visible={addCardModalVisible}
      hide={hide}
      onModalHide={handleHide}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 55,
    left: 15,
    right: 15,
  },
  dropdown: {
    borderColor: '#525A86',
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    height: 45,
    paddingHorizontal: 15,
    marginTop: 12,
  },
  grey: {
    color: '#B7BFDB',
    lineHeight: 18,
    textAlign: 'justify',
  },
  image: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subText: {
    color: colors.SECONDARY_TEXT,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    marginTop: 22,
  },
  text: {
    color: colors.PRIMARY_TEXT,
    flex: 1,
  },
});
