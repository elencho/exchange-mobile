import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import React, { memo } from 'react';
import Modal from 'react-native-modal';
import ModalTop from './ModalTop';
import colors from '../constants/colors';
import AppText from './AppText';
import AppToast from './AppToast';
import Background from './Background';
import CloseModalIcon from './InstantTrade/CloseModalIcon';
import Headline from './TransactionHistory/Headline';
import GestureRecognizer from 'react-native-swipe-gestures';

import Constants from 'expo-constants';

const AndroidModal = ({
  children,
  visible,
  hide,
  bottom,
  title,
  fullScreen,
  custom,
  onModalHide,
  onDismiss,
  position = '120%',
}) => {
  return (
    <GestureRecognizer style={{ flex: 1 }} onSwipeDown={hide}>
      <Modal
        isVisible={visible}
        onBackdropPress={hide}
        onSwipeComplete={hide}
        //swipeDirection="down"
        propagateSwipe={true}
        style={styles.modal}
        animationOutTiming={500}
        backdropTransitionInTiming={300}
        onModalHide={onModalHide}
        hideModalContentWhileAnimating
        //useNativeDriver
        useNativeDriverForBackdrop
        onDismiss={onDismiss}
        // coverScreen={false}
      >
        <>
          {bottom && (
            <KeyboardAvoidingView
              behavior={Platform.select({ android: undefined, ios: 'padding' })}
              keyboardVerticalOffset={Platform.select({
                ios: 50,
                android: 500,
              })}
            >
              <ModalTop />
              <View style={styles.bottom}>
                {title && (
                  <AppText header style={styles.header}>
                    {title}
                  </AppText>
                )}
                {children}
              </View>
            </KeyboardAvoidingView>
          )}
          {fullScreen && (
            <Background modal>
              <CloseModalIcon onPress={hide} />
              {title && <Headline title={title} />}
              {children}
            </Background>
          )}
          {custom && children}
        </>
        <AppToast />
      </Modal>
    </GestureRecognizer>
  );
};

export default memo(AndroidModal);

const styles = StyleSheet.create({
  bottom: {
    padding: 35,
    backgroundColor: colors.SECONDARY_BACKGROUND,
    marginBottom: -3,
  },
  header: {
    color: colors.PRIMARY_TEXT,
    marginBottom: 25,
  },
  modal: {
    marginHorizontal: 0,
    marginTop: Platform.select({ ios: Constants.statusBarHeight, android: 0 }),
    marginBottom: Platform.select({
      ios: undefined,
      android: 0,
    }),
    justifyContent: 'flex-end',
  },
});
