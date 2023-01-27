import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

import { reducer } from '../redux/rootReducer';
import mySaga from '../redux/sagas';

const sagaMiddleware = createSagaMiddleware({
  onError: (error) => alert(error),
});

const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
  devTools: true,
});
sagaMiddleware.run(mySaga);

export default store;
