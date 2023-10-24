import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'

export const useIdentityModal = () => {
	const dispatch = useDispatch()
	const identityModalVisible = useSelector(
		(state: RootState) => state.modalState.identityModalVisible
	)

	const hide = () => dispatch({ type: 'TOGGLE_IDENTITY_MODAL' })

	return { identityModalVisible, hide }
}
