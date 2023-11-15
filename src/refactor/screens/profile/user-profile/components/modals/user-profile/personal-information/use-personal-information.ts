import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'

const usePersonalInformation = ({
	togglePersonalInfoModal,
}: {
	togglePersonalInfoModal: (visible: boolean) => void
}) => {
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state.profile)
	const { userInfo } = state

	const edit = () => {
		dispatch({ type: 'SAVE_GENERAL_ERROR', generalError: null })
		togglePersonalInfoModal(true)
	}
	return {
		edit,
		userInfo,
	}
}

export default usePersonalInformation
