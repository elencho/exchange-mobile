import React from 'react';
import { Pressable, Text } from 'react-native';
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

  return onPress ? (
    <Pressable onPress={onPress}>
      <Text
        style={[style, { fontFamily: fontCond(), fontSize: sizeCond() }]}
        {...props}
      >
        {text()}
      </Text>
    </Pressable>
  ) : (
    <Text
      style={[style, { fontFamily: fontCond(), fontSize: sizeCond() }]}
      {...props}
    >
      {text()}
    </Text>
  );
}
