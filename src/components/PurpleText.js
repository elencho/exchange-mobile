import React from 'react';

import AppText from './AppText';
import colors from '../constants/colors';

export default function PurpleText({
  text,
  style,
  onPress,
  subtext = false,
  ...rest
}) {
  return (
    <AppText
      medium
      subtext={subtext}
      onPress={onPress}
      style={[{ color: colors.SECONDARY_PURPLE, fontSize: 30 }, style]}
      {...rest}
    >
      {text}
    </AppText>
  );
}
