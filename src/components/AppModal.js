import React from 'react';
import Modal from 'react-native-modal';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Constants from 'expo-constants';

import ModalTop from './ModalTop';
import colors from '../constants/colors';
import AppText from './AppText';
import Background from './Background';
import CloseModalIcon from './InstantTrade/CloseModalIcon';
import Headline from './TransactionHistory/Headline';

export default function AppModal({
  children,
  visible,
  hide,
  bottom,
  title,
  fullScreen,
  custom,
  onModalHide,
}) {
  // const deviceHeight =
  //   Platform.OS === 'ios'
  //     ? Dimensions.get('window').height
  //     : require('react-native-extra-dimensions-android').get(
  //         'REAL_WINDOW_HEIGHT'
  //       );

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={hide}
      onSwipeComplete={hide}
      swipeDirection="down"
      propagateSwipe={true}
      style={styles.modal}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      onModalHide={onModalHide}
    >
      {bottom && (
        <KeyboardAvoidingView
          contentContainerStyle={{ borderWidth: 2, borderColor: 'yellow' }}
          behavior={Platform.select({ android: undefined, ios: 'padding' })}
          keyboardVerticalOffset={Platform.select({ ios: 50, android: 500 })}
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
        <Background>
          <CloseModalIcon onPress={hide} />
          {title && <Headline title={title} />}
          {children}
        </Background>
      )}
      {custom && children}
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottom: {
    padding: 35,
    backgroundColor: colors.SECONDARY_BACKGROUND,
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
