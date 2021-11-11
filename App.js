import React from 'react';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { useFonts } from 'expo-font';

import { reducer } from './src/redux/rootReducer';
import mySaga from './src/redux/sagas';
import Navigator from './src/navigation';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(mySaga);

export default function App() {
  const [loaded] = useFonts({
    Ubuntu_Regular: require('./src/assets/fonts/Ubuntu_Regular.ttf'),
    Ubuntu_Medium: require('./src/assets/fonts/Ubuntu_Medium.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.statusBar} />
      <SafeAreaView style={styles.container}>
        <Navigator />
      </SafeAreaView>
      <SafeAreaView style={styles.statusBar} />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  statusBar: {
    flex: 0,
    backgroundColor: '#161629',
  },
});
