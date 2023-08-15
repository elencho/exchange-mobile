import React, { useCallback } from 'react';
import { StyleSheet, StatusBar, LogBox, View } from 'react-native';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { useAssets } from 'expo-asset';

import AppToast from './src/components/AppToast';
import Navigator from './src/navigation';
import store from './src/redux/store';
import images from './src/constants/images';
import colors from './src/constants/colors';
import './src/utils/i18n';
import './src/utils/interceptor';
import { IS_IOS } from './src/constants/system';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

LogBox.ignoreLogs([
  // TODO: Remove when fixed
  'VirtualizedLists should never be nested',
]);

function App(): JSX.Element {
  const [fontsLoaded] = useFonts({
    Ubuntu_Regular: require('./src/assets/fonts/Ubuntu_Regular.ttf'),
    Ubuntu_Medium: require('./src/assets/fonts/Ubuntu_Medium.ttf'),
  });

  const [assets] = useAssets(Object.values(images));

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) return;
  }, [fontsLoaded]);

  if (!fontsLoaded || !assets) {
    return <View />;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={'transparent'}
          translucent
          barStyle="light-content"
        />
        {IS_IOS && <SafeAreaView style={styles.statusBar} />}
        <SafeAreaView
          style={styles.container}
          onLayout={onLayoutRootView}
          edges={['bottom']}
        >
          <AppToast />
          <Navigator />
        </SafeAreaView>
        {IS_IOS && <SafeAreaView style={styles.statusBar} />}
      </GestureHandlerRootView>
    </Provider>
  );
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
  statusBar: {
    flex: 0,
    backgroundColor: colors.PRIMARY_BACKGROUND,
  },
});
