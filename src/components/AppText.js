import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export default function AppText({
  children,
  style,
  medium,
  body,
  header,
  subtext,
  calendarDay,
  small,
  onPress,
  isForCodeInput,
  ...props
}) {
  const generalError = useSelector((state) => state.errors.generalError);

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

  const heightCond = () => {
    if (header) {
      return 24;
    }
    if (calendarDay) {
      return 20;
    }
    if (body) {
      return 18;
    }
    if (subtext) {
      return 16;
    }
    if (small) {
      return 15;
    }
    if (!medium) {
      return 18;
    }
    if (medium && !body && !header && !calendarDay) {
      return 18;
    }
  };

  const { t } = useTranslation();

  const text = () => {
    if (typeof children === 'string') {
      if (children.includes('{{') && children.includes('}}')) {
        return t(children, generalError?.transParams);
      }
      return t(children);
    } else {
      return children;
    }
  };

  return (
    <Text
      accessibilityRole={onPress ? 'button' : 'text'}
      style={[
        style,
        {
          fontFamily: fontCond(),
          fontSize: sizeCond(),
          lineHeight: heightCond(),
        },
      ]}
      onPress={onPress}
      {...props}
    >
      {text()}
    </Text>
  );
}
