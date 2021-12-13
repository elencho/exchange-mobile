import React from 'react';
import Modal from 'react-native-modal';
import { Dimensions, View, StyleSheet } from 'react-native';
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
}) {
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
      {bottom && (
        <>
          <ModalTop />
          <View style={styles.bottom}>
            <AppText header style={styles.header}>
              {title}
            </AppText>
            {children}
          </View>
        </>
      )}
      {fullScreen && (
        <Background>
          <CloseModalIcon onPress={hide} />
          <Headline title={title} />
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
});
