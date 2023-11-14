import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@app/refactor/redux/rootReducer'
import { switchLanguage } from '@app/utils/i18n'
import { fetchUserInfoThunk } from '@app/refactor/redux/profile/profileThunks'
import { setLanguage } from '@store/redux/common/slice'
import { Language } from '@app/refactor/common/constants'
import { useState } from 'react'

export const useChooseLanguage = () => {
	const dispatch = useDispatch()
	const state = useSelector((state: RootState) => state)
	const [languageModalVisible, setLanguageModalVisible] = useState(false)
	const {
		common: { language },
	} = state

	const hide = () => setLanguageModalVisible(false)

	const chooseLanguage = (l: Language) => {
		dispatch(setLanguage(l))
		switchLanguage(l)
		hide()
		dispatch(fetchUserInfoThunk())
	}

	return { chooseLanguage, hide, language, languageModalVisible }
}
