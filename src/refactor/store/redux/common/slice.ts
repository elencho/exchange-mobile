import { Language } from '@app/refactor/common/constants'
import { i18n } from '@app/refactor/setup/i18n'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import KVStore from '@store/kv'

interface CommonState {
	language: Language
}

const initialState: CommonState = {
	language: KVStore.get('language') || 'en',
}

const common = createSlice({
	name: 'common',
	initialState,
	reducers: {
		setLanguage(state, action: PayloadAction<Language>) {
			i18n.switchLanguage(action.payload)
			state.language = action.payload
			KVStore.set('language', action.payload)
		},
	},
})

export const { setLanguage } = common.actions
export default common.reducer
