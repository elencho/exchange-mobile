import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import colors from '../constants/colors'
import AppText from './AppText'

function PurpleText({
	text,
	style,
	onPress,
	disabled,
	subtext = false,
	...rest
}) {
	const { t } = useTranslation()

	const purpleText = () => {
		if (typeof children === 'string') {
			if (text.includes('{{') && text.includes('}}')) {
				return t(text, generalError?.transParams)
			}
			return t(text)
		} else {
			return text
		}
	}

	return (
		<AppText
			medium
			subtext={subtext}
			onPress={onPress}
			style={[
				{ color: colors.SECONDARY_PURPLE },
				disabled && { color: colors.BUTTON_DISABLED },
				style,
			]}
			disabled={!onPress}
			{...rest}>
			{purpleText()}
		</AppText>
	)
}

export default memo(PurpleText)
