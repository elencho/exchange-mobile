import React from 'react';
import { useDispatch } from 'react-redux';
import { useKeyboard } from '@react-native-community/hooks';
import { setShouldRefreshOnScroll } from '../redux/wallet/actions';
import { IS_ANDROID, IS_IOS } from '../constants/system';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function WithKeyboard({
  children,
  modal,
  contentContainerStyle = {},
  refreshControl,
  keyboardVerticalOffsetIOS = 50,
}) {
  const dispatch = useDispatch();
  const keyboard = useKeyboard();

  const visible = keyboard?.keyboardShown;
  const height = -keyboard.keyboardHeight + keyboardVerticalOffsetIOS;

  const onScrollEndDrag = (e) => {
    if (IS_IOS && e.nativeEvent?.contentOffset?.y < -90)
      dispatch(setShouldRefreshOnScroll(true));
  };

  return (
    <KeyboardAwareScrollView
      scrollEnabled
      enableOnAndroid
      refreshControl={refreshControl}
      enableAutomaticScroll
      enableResetScrollToCoords
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
      onScrollEndDrag={onScrollEndDrag}
      style={
        visible && modal && IS_ANDROID
          ? { marginBottom: height }
          : { marginBottom: 0 }
      }
    >
      {children}
    </KeyboardAwareScrollView>
  );
}
