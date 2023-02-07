import React from 'react';

import AppText from './AppText';
import colors from '../constants/colors';
//TIP: using react-native-gesture-handler btn to handle press onScroll
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function PurpleText({
  text,
  style,
  onPress,
  subtext = false,
  ...rest
}) {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <AppText
        medium
        subtext={subtext}
        onPress={onPress}
        style={[{ color: colors.SECONDARY_PURPLE, fontSize: 30 }, style]}
        {...rest}
      >
        {text}
      </AppText>
    </TouchableOpacity>
  );
}
