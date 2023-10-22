import { useDispatch, useSelector } from 'react-redux'
import { toggleLanguageModal } from '@app/refactor/redux/modals/modalsSlice'
import { fetchUserInfo, setLanguage } from '@app/refactor/redux/profile/actions'
import { RootState } from '@app/refactor/redux/rootReducer'
import { switchLanguage } from '@app/utils/i18n'

export const useChooseLanguage = () => {
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state)
	const {
		modals: { languageModalVisible },
		profile: { language },
	} = state

	const hide = () => dispatch(toggleLanguageModal(false))

	const chooseLanguage = (l: string) => {
		dispatch(setLanguage(l))
		switchLanguage(l)
		hide()
		dispatch(fetchUserInfo())
	}

	return { chooseLanguage, hide, language, languageModalVisible }
}
