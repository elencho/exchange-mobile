import React from 'react';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { useFonts } from 'expo-font';
import { useAssets } from 'expo-asset';

import { reducer } from './src/redux/rootReducer';
import mySaga from './src/redux/sagas';
import Navigator from './src/navigation';
import images from './src/constants/images';
import colors from './src/constants/colors';
import './src/utils/i18n';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(mySaga);

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
