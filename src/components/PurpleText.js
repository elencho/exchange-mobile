import React, { memo } from 'react';

import AppText from './AppText';
import colors from '../constants/colors';

function PurpleText({ text, style, onPress, subtext = false, ...rest }) {
  return (
    <AppText
      medium
      subtext={subtext}
      onPress={onPress}
      style={[
        { color: colors.SECONDARY_PURPLE, fontSize: 30, lineHeight: 34 },
        style,
      ]}
      disabled={!onPress}
      {...rest}
    >
      {text}
    </AppText>
  );
}

export default memo(PurpleText);
