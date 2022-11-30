import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function AppText({
  children,
  style,
  medium,
  body,
  header,
  subtext,
  calendarDay,
  small,
  ...props
}) {
  const fontCond = () => {
    if (medium || header) {
      return 'Ubuntu_Medium';
    }
    return 'Ubuntu_Regular';
  };

  const sizeCond = () => {
    if (header) {
      return 20;
    }
    if (calendarDay) {
      return 16;
    }
    if (body) {
      return 14;
    }
    if (subtext) {
      return 12;
    }
    if (small) {
      return 11;
    }
  };

  const { t } = useTranslation();

  const text = () => {
    if (typeof children === 'string') {
      return t(children);
    } else {
      return children;
    }
  };

  return (
    <Text
      style={[style, { fontFamily: fontCond(), fontSize: sizeCond() }]}
      {...props}
    >
      {text()}
    </Text>
  );
}
