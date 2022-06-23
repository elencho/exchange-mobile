import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { useAssets } from 'expo-asset';

import Navigator from './src/navigation';
import store from './src/redux/store';
import images from './src/constants/images';
import colors from './src/constants/colors';
import './src/utils/i18n';
import './src/utils/interceptor';

export default function App() {
  const [fonts] = useFonts({
    Ubuntu_Regular: require('./src/assets/fonts/Ubuntu_Regular.ttf'),
    Ubuntu_Medium: require('./src/assets/fonts/Ubuntu_Medium.ttf'),
  });

  const [assets] = useAssets(Object.values(images));

  if (!fonts || !assets) {
    return null;
  }

  const iphone = Platform.OS === 'ios';

  return (
    <Provider store={store}>
      {iphone && <StatusBar style="light" />}
      {iphone && <SafeAreaView style={styles.statusBar} />}
      <SafeAreaView style={styles.container}>
        <Navigator />
      </SafeAreaView>
      {iphone && <SafeAreaView style={styles.statusBar} />}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: colors.PRIMARY_BACKGROUND,
  },
  statusBar: {
    flex: 0,
    backgroundColor: colors.PRIMARY_BACKGROUND,
  },
});
