import React, { memo } from 'react';
import Modal from 'react-native-modal';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Constants from 'expo-constants';
import { RootSiblingParent } from 'react-native-root-siblings';

import ModalTop from './ModalTop';
import colors from '../constants/colors';
import AppText from './AppText';
import AppToast from './AppToast';
import Background from './Background';
import CloseModalIcon from './InstantTrade/CloseModalIcon';
import Headline from './TransactionHistory/Headline';
import { useSelector } from 'react-redux';
import { IS_IOS } from '../constants/system';

function AppModal({
  children,
  visible,
  hide,
  bottom,
  title,
  fullScreen,
  custom,
  onModalHide,
  onDismiss,
  modalStyle,
}) {
  const webViewVisible = useSelector((state) => state?.modals?.webViewVisible);

  // const deviceHeight =
  //   Platform.OS === 'ios'
  //     ? Dimensions.get('window').height
  //     : require('react-native-extra-dimensions-android').get(
  //         'REAL_WINDOW_HEIGHT'
  //       );

  // ERROR DISSAPEARING
  // const modalHide = () => {
  //   dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null });
  //   hide();
  // };
  return (
    webViewVisible && (
      <Modal
        isVisible={visible}
        onBackdropPress={hide}
        onSwipeComplete={hide}
        swipeDirection="down"
        propagateSwipe={true}
        style={[styles.modal, modalStyle]}
        animationOutTiming={500}
        backdropTransitionInTiming={300}
        onModalHide={onModalHide}
        hideModalContentWhileAnimating
        useNativeDriver
        useNativeDriverForBackdrop
        onDismiss={onDismiss}
        // coverScreen={false}
      >
        <RootSiblingParent>
          {bottom && (
            <KeyboardAvoidingView
              behavior={Platform.select({
                android: undefined,
                ios: 'padding',
              })}
              keyboardVerticalOffset={Platform.select({
                ios: 0,
                android: 500,
              })}
            >
              <ModalTop bottom={bottom} />
              <View style={styles.bottom}>
                {title && (
                  <AppText
                    header
                    style={[styles.header, bottom && { marginLeft: 8 }]}
                  >
                    {title}
                  </AppText>
                )}
                {children}
              </View>
            </KeyboardAvoidingView>
          )}
          {fullScreen && (
            <Background modal>
              <CloseModalIcon
                onPress={hide}
                style={IS_IOS && { marginTop: 36 - Constants.statusBarHeight }}
              />
              {title && <Headline title={title} />}
              {children}
            </Background>
          )}
          {custom && children}
        </RootSiblingParent>
        <AppToast />
      </Modal>
    )
  );
}
export default memo(AppModal);

const styles = StyleSheet.create({
  bottom: {
    paddingTop: 40,
    paddingHorizontal: 10,
    paddingBottom: 40,
    backgroundColor: colors.PRIMARY_BACKGROUND,
    marginBottom: -3,
  },
  header: {
    color: colors.PRIMARY_TEXT,
    marginBottom: 12,
  },
  modal: {
    margin: 0,

    justifyContent: 'flex-end',
  },
});
