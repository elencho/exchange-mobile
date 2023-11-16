import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'
import { saveGeneralError } from '@app/refactor/redux/errors/errorsSlice'

const usePersonalInformation = ({
	togglePersonalInfoModal,
}: {
	togglePersonalInfoModal: (visible: boolean) => void
}) => {
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state.profile)
	const { userInfo } = state

	const edit = () => {
		dispatch(saveGeneralError(null))
		togglePersonalInfoModal(true)
	}
	return {
		edit,
		userInfo,
	}
}

export default usePersonalInformation
