import { Action, configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import thunkMiddleware from 'redux-thunk'
import { RootState, reducer } from './rootReducer'
import mySaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware, thunkMiddleware]
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

export type AppDispatch = typeof store.dispatch
export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>

export const useAppDispatch = () => useDispatch<ThunkAppDispatch>()

export default store
