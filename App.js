import React, { useCallback } from 'react';
import { Platform, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { useAssets } from 'expo-asset';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';

import Navigator from './src/navigation';
import store from './src/redux/store';
import images from './src/constants/images';
import colors from './src/constants/colors';
import './src/utils/i18n';
import './src/utils/interceptor';
import AppToast from './src/components/AppToast';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Ubuntu_Regular: require('./src/assets/fonts/Ubuntu_Regular.ttf'),
    Ubuntu_Medium: require('./src/assets/fonts/Ubuntu_Medium.ttf'),
  });

  const [assets] = useAssets(Object.values(images));

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded || !assets) {
    return null;
  }

  const iphone = Platform.OS === 'ios';

  return (
    <Provider store={store}>
      {iphone && <StatusBar style="light" />}
      {iphone && <SafeAreaView style={styles.statusBar} />}
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <AppToast />
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
    paddingTop: Platform.OS == 'android' ? Constants.statusBarHeight : 0,
  },
  statusBar: {
    flex: 0,
    backgroundColor: colors.PRIMARY_BACKGROUND,
  },
});
