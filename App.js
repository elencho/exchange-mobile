import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Platform,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  LogBox,
  AppState,
  Text,
} from 'react-native';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { useAssets } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import SystemNavigationBar from 'react-native-system-navigation-bar';

import Navigator from './src/navigation';
import store from './src/redux/store';
import images from './src/constants/images';
import colors from './src/constants/colors';
import './src/utils/i18n';
import './src/utils/interceptor';
import AppToast from './src/components/AppToast';

LogBox.ignoreLogs([
  // TODO: Remove when fixed
  'VirtualizedLists should never be nested',
]);
SplashScreen.preventAutoHideAsync();

// const codePushOptions = {
//   updateDialog: true,
//   installMode: CodePush.InstallMode.IMMEDIATE,
//   checkFrequency: CodePush.CheckFrequency.ON_APP_START,
// };

function App() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  // useEffect(() => {
  //   CodePush.notifyAppReady();
  //   CodePush.sync(codePushOptions);
  // });
  SystemNavigationBar.stickyImmersive();
  SystemNavigationBar.setNavigationColor(
    colors.PRIMARY_BACKGROUND,
    'light',
    'both'
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

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
      <StatusBar barStyle="light-content" hidden={!iphone} />
      {iphone && <SafeAreaView style={styles.statusBar} />}
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        {/* <AppToast />
        <Navigator /> */}
        <Text style={{ color: '#FFFFFF' }}>asd</Text>
      </SafeAreaView>
      {iphone && <SafeAreaView style={styles.statusBar} />}
    </Provider>
  );
}
// export default CodePush(codePushOptions)(App);
export default App;

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
