import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'

interface Props {
	toggleIdentityModalVisible: (visible: boolean) => void
}

export const useIdentityModal = ({ toggleIdentityModalVisible }: Props) => {
	const hide = () => toggleIdentityModalVisible(false)

	return { hide }
}
