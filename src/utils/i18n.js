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
	interpolation: true,
})

export default i18next

export const switchLanguage = async (lang) => {
	await SecureStore.setItemAsync('language', lang)
	i18next.changeLanguage(lang, (err, t) => {
		if (err) return console.log('something went wrong loading', err)
		t('key')
	})
}

export const addResources = (lng, ns, resources) => {
	i18next.addResources(lng, ns, resources)
}
