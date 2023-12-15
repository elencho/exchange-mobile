import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const translate = (textNode: ReactNode) => {
	const { t } = useTranslation()
	const {
		modalState: { appToastObj },
		errors: { generalError },
	}: any = useSelector((state) => state)

	if (typeof textNode === 'string') {
		if (textNode.includes('{{') && textNode.includes('}}')) {
			return t(textNode, generalError?.transParams || appToastObj?.transParams)
		}
		return t(textNode)
	}
	return textNode
}

export default translate
