import { useDispatch, useSelector } from 'react-redux'
import { togglePersonalInfoModal } from '@app/refactor/redux/modals/modalsSlice'
import { RootState } from '@app/refactor/redux/rootReducer'
import { saveGeneralError } from '@app/refactor/redux/errors/errorsSlice'

const usePersonalInformation = () => {
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state.profile)
	const { userInfo } = state

	const edit = () => {
		// TODO: Remove after wallets refactor
		dispatch(saveGeneralError(null))

		dispatch(togglePersonalInfoModal(true))
	}
	return {
		edit,
		userInfo,
	}
}

export default usePersonalInformation
