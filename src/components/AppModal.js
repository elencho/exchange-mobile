import React from 'react';
import { BottomModal, SlideAnimation } from 'react-native-modals';
import Modal from 'react-native-modal';
import { Dimensions } from 'react-native';
import Constants from 'expo-constants';

export default function AppModal({ children, visible, hide }) {
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight =
    Platform.OS === 'ios'
      ? Dimensions.get('window').height
      : require('react-native-extra-dimensions-android').get(
          'REAL_WINDOW_HEIGHT'
        );

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={hide}
      onSwipeComplete={hide}
      swipeDirection="down"
      propagateSwipe={true}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      style={{
        marginHorizontal: 0,
        marginTop: Constants.statusBarHeight,
        justifyContent: 'flex-end',
      }}
    >
      {children}
    </Modal>
  );
}
