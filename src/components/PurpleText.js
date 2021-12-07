import React from 'react';

import AppText from './AppText';
import colors from '../constants/colors';

export default function PurpleText({ text, style, onPress }) {
  return (
    <AppText
      medium
      onPress={onPress}
      style={[{ color: colors.SECONDARY_PURPLE }, style]}
    >
      {text}
    </AppText>
  );
}
