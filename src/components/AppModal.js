import React from 'react';
import { Modal, BottomModal, SlideAnimation } from 'react-native-modals';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

export default function AppModal({ children, bottom = false, visible, hide }) {
  const height = useSafeAreaFrame().height;
  const width = useSafeAreaFrame().width;

  return (
    <>
      {!bottom && (
        <Modal
          visible={visible}
          onTouchOutside={hide}
          onSwipeOut={hide}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          swipeDirection="down"
          rounded={false}
          width={width}
          height={height}
        >
          {children}
        </Modal>
      )}

      {bottom && (
        <BottomModal
          visible={visible}
          onTouchOutside={hide}
          onSwipeOut={hide}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          swipeDirection="down"
          rounded={false}
        >
          {children}
        </BottomModal>
      )}
    </>
  );
}
