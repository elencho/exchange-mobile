import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';
import { memo, useState, useEffect } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import ModalTop from './ModalTop';
import AppText from './AppText';
import Background from './Background';
import CloseModalIcon from './InstantTrade/CloseModalIcon';
import colors from '../constants/colors';
import Headline from './TransactionHistory/Headline';
import AppToast from './AppToast';

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
  //TODO:refactor

  //   const [fadeAnim] = useState(new Animated.Value(0));
  //   useEffect(() => {
  //     fadeIn();
  //   }, []);

  //   const fadeIn = () => {
  //     Animated.timing(fadeAnim, {
  //       toValue: 1,
  //       duration: 100,
  //       useNativeDriver: true,
  //     }).start();
  //   };

  //   useCallback(() => {
  //     Animated.timing(fadeAnim, {
  //       toValue: 0,
  //       duration: 4000,
  //       useNativeDriver: true,
  //     }).start();
  //   }, [hide]);

  //   const fadeOut = () => {
  //     Animated.timing(fadeAnim, {
  //       toValue: 0,
  //       duration: 4000,
  //       useNativeDriver: true,
  //     }).start();
  //   };
  //   const onSwipeDown = () => {
  //     hide();
  //     fadeOut();
  //   };

  return (
    visible && (
      <GestureRecognizer style={{ flex: 1 }} onSwipeDown={hide}>
        <>
          <Modal
            transparent={true}
            visible={visible}
            //   swipeDirection="down"
            //   animationType={'swipe'}
            style={styles.modal}
          >
            <TouchableWithoutFeedback
              onPress={hide}
              style={{ backgroundColor: 'red', height: '100%' }}
            >
              <>
                {bottom && (
                  <KeyboardAvoidingView
                    behavior={'position'}
                    keyboardVerticalOffset={200}
                    style={{
                      height: position,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <View
                      style={{
                        zIndex: -1,
                        height: '50%',
                        marginTop: 'auto',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                      }}
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
                <AppToast />
              </>
            </TouchableWithoutFeedback>
          </Modal>
        </>
      </GestureRecognizer>
    )
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
    marginTop: 0,
    marginBottom: 0,
    justifyContent: 'flex-end',
    flex: 1,
    height: '50%',
  },
});
