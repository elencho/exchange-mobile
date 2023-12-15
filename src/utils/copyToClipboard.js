import * as Clipboard from 'expo-clipboard'
import { useTranslation } from 'react-i18next'
import { ToastAndroid } from 'react-native'
import Toast from 'react-native-root-toast'
import { IS_IOS } from '../constants/system'

const useCopyToClipboard = () => {
	const { t } = useTranslation()

	const copyToClipboard = (text) => {
		if (text) {
			Clipboard.setStringAsync(text)
				.then(() => {
					if (IS_IOS) {
						Toast.show(t('Copied'))
					} else {
						ToastAndroid.show(t('Copied'), ToastAndroid.SHORT)
					}
				})

				.catch((err) => console.log(err))
		}
	}

	return { copyToClipboard }
}

export default useCopyToClipboard
