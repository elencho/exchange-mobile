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
  ...props
}) {
  const fontCond = () => {
    if (medium || header) {
      return 'Ubuntu_Medium';
    }
    if (subtext || body) {
      return 'Ubuntu_Regular';
    }
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
  };

  const { t, i18n } = useTranslation();

  return (
    <Text
      style={[style, { fontFamily: fontCond(), fontSize: sizeCond() }]}
      {...props}
    >
      {t(children)}
    </Text>
  );
}
