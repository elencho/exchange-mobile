import React from 'react';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

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
  const statusBarCond = () => {
    if (Platform.OS === 'android') {
      return <StatusBar style="light" />;
    }
    return <SafeAreaView style={styles.statusBar} />;
  };

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
