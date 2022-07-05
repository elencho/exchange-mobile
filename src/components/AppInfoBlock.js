import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppText from './AppText';

export default function AppInfoBlock({ content = [], info, warning, ...rest }) {
  const lastItemStyle = (i) => {
    if (i === content.length - 1) return { marginBottom: 0 };
  };

  const background = () => {
    if (warning) return { backgroundColor: 'rgba(242, 223, 180, 0.04)' };
    if (info) return { backgroundColor: 'rgba(149, 164, 247, 0.07)' };
  };

  const bullet = () => {
    if (warning) return { backgroundColor: '#FFC65C' };
    if (info) return { backgroundColor: '#838BB2' };
  };

  const text = () => {
    if (warning) return { color: '#F2DFB4' };
    if (info) return { color: '#838BB2' };
  };

  return (
    <View style={[styles.info, background()]} {...rest}>
      {content.map((c, i) => (
        <View style={[styles.row, lastItemStyle(i)]} key={c}>
          {content.length > 1 && <View style={[styles.bullet, bullet()]} />}
          <AppText subtext style={[styles.infoText, text()]} key={c}>
            {c}
          </AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginRight: 10,
    marginTop: 7,
  },
  info: {
    paddingVertical: 15,
    paddingHorizontal: 18,
    marginTop: 16,
  },
  infoText: {
    lineHeight: 18,
    textAlign: 'justify',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
