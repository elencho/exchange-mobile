import store from '@app/refactor/redux/store'
import { Route, Screens } from '@app/refactor/setup/nav/nav'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { setUiError } from '@store/redux/common/slice'
import { useEffect } from 'react'

const useCleanGeneralError = (
	navigation?: NativeStackNavigationProp<Screens, Route>
) => {
	useEffect(() => {
		return navigation?.addListener('focus', () => {
			store.dispatch(setUiError(undefined))
		})
	}, [navigation])
}

export default useCleanGeneralError
