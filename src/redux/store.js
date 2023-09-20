import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { reducer } from '../redux/rootReducer'
import mySaga from '../redux/sagas'

const sagaMiddleware = createSagaMiddleware({
	// onError: (error) => alert(error),
})

const middlewares = [sagaMiddleware]
if (__DEV__) {
	const createDebugger = require('redux-flipper').default
	middlewares.push(createDebugger())
}
const store = configureStore({
	reducer,
	middleware: [...middlewares],
	devTools: true,
})
sagaMiddleware.run(mySaga)

export default store
