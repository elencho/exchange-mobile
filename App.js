import React, { useCallback, useEffect } from 'react';
import {
  Platform,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  LogBox,
  Alert,
  Linking,
} from 'react-native';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { useAssets } from 'expo-asset';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import VersionCheck from 'react-native-version-check';

import AppToast from './src/components/AppToast';
import Navigator from './src/navigation';
import store from './src/redux/store';
import images from './src/constants/images';
import colors from './src/constants/colors';
import './src/utils/i18n';
import './src/utils/interceptor';

LogBox.ignoreLogs([
  // TODO: Remove when fixed
  'VirtualizedLists should never be nested',
]);

// const codePushOptions = {
//   updateDialog: true,
//   installMode: CodePush.InstallMode.IMMEDIATE,
//   checkFrequency: CodePush.CheckFrequency.ON_APP_START,
// };

function App() {
  changeNavigationBarColor(colors.PRIMARY_BACKGROUND, true);
  // useEffect(() => {
  //   CodePush.notifyAppReady();
  //   CodePush.sync(codePushOptions);
  // })
  useEffect(() => {
    checkVersion();
  }, []);

  const checkVersion = async () => {
    try {
      const updateNeeded = await VersionCheck.needUpdate();
      if (updateNeeded && updateNeeded.isNeeded) {
        Alert.alert(
          'Please Update',
          'You will have to update',
          [
            {
              text: 'Update',
              onPress: () => {
                Linking.openURL(updateNeeded.storeUrl);
              },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {}
  };

  const [fontsLoaded] = useFonts({
    Ubuntu_Regular: require('./src/assets/fonts/Ubuntu_Regular.ttf'),
    Ubuntu_Medium: require('./src/assets/fonts/Ubuntu_Medium.ttf'),
  });

  const [assets] = useAssets(Object.values(images));

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) return;
  }, [fontsLoaded]);

  if (!fontsLoaded || !assets) {
    return null;
  }

  const iphone = Platform.OS === 'ios';

  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor={colors.PRIMARY_BACKGROUND}
        barStyle="light-content"
      />
      {iphone && <SafeAreaView style={styles.statusBar} />}
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <AppToast />
        <Navigator />
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
