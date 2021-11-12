import React from 'react';
import { Text } from 'react-native';

export default function AppText({
  children,
  style,
  medium,
  body,
  header,
  subtext,
  ...props
}) {
  const fontCond = () => {
    if (medium || header) {
      return 'Ubuntu_Medium';
    }
    if (subtext) {
      return 'Ubuntu_Regular';
    }
  };
  const sizeCond = () => {
    if (header) {
      return 20;
    }
    if (body) {
      return 14;
    }
    if (subtext) {
      return 12;
    }
  };

  return (
    <Text
      style={[style, { fontFamily: fontCond(), fontSize: sizeCond() }]}
      {...props}
    >
      {children}
    </Text>
  );
}
