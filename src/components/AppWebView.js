import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';

export default function AppWebView({ uri, handleUrlChange }) {
  return (
    <TouchableOpacity activeOpacity={0.99} style={styles.webView}>
      <WebView source={{ uri }} onNavigationStateChange={handleUrlChange} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  webView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
