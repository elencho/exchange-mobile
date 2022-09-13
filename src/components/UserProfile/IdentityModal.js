import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppModal from '../AppModal';
import AppText from '../AppText';
import colors from '../../constants/colors';

export default function IdentityModal() {
  const dispatch = useDispatch();
  const identityModalVisible = useSelector(
    (state) => state.modals.identityModalVisible
  );

  const hide = () => dispatch({ type: 'TOGGLE_IDENTITY_MODAL' });

  const children = (
    <AppText style={{ color: colors.SECONDARY_TEXT, lineHeight: 20 }}>
      verification text key
    </AppText>
  );

  return (
    <AppModal
      hide={hide}
      visible={identityModalVisible}
      children={children}
      bottom
      title="Identity Verification"
    />
  );
}
