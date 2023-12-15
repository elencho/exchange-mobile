import { Language } from '@app/refactor/common/constants'
import * as SecureStore from 'expo-secure-store'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

i18next.use(initReactI18next).init({
	react: { useSuspense: false },
	compatibilityJSON: 'v3',
	lng: 'en-US',
	fallbackLng: 'en-US',
	returnEmptyString: true,
	resources: {},
})

export const i18n = {
	addResources: (language: string, translations: Record<string, string>) => {
		i18next.addResources(language, 'translation', translations)
	},
	switchLanguage: async (language: Language) => {
		i18next.changeLanguage(language, (err, t) => {
			if (err) return console.log('something went wrong loading', err)
			t('key')
		})
	},
}
