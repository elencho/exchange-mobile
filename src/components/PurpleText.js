import React, { memo } from 'react';

import AppText from './AppText';
import colors from '../constants/colors';
import { useTranslation } from 'react-i18next';

function PurpleText({
  text,
  style,
  onPress,
  disabled,
  subtext = false,
  ...rest
}) {
  const { t } = useTranslation();

  const purpleText = () => {
    if (typeof children === 'string') {
      if (text.includes('{{') && text.includes('}}')) {
        return t(text, generalError?.transParams);
      }
      return t(text);
    } else {
      return text;
    }
  };

  return (
    <AppText
      medium
      subtext={subtext}
      onPress={onPress}
      style={[
        { color: colors.SECONDARY_PURPLE },
        disabled && { color: colors.BUTTON_DISABLED },
        style,
      ]}
      disabled={!onPress}
      {...rest}
    >
      {purpleText()}
    </AppText>
  );
}

export default memo(PurpleText);
