import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, TextProps, TextStyle } from 'react-native'
import { FontTheme } from '@theme/fonts'
import { useTheme } from '@theme/index'
import KVStore from '@store/kv'

type Variant = 's' | 'm' | 'l' | 'title' | 'headline'

type Props = TextProps & {
	variant?: Variant
	medium?: boolean
	noTranslate?: boolean
}

const AppText: React.FC<Props> = (props) => {
	const { variant, medium, noTranslate, children, onPress, style } = props
	const { theme } = useTheme()

	const language = KVStore.get('language')
	const isMtavruli = language === 'ka' && variant == 'headline'

	const translate = (textNode: ReactNode) => {
		const { t } = useTranslation()
		if (typeof textNode === 'string' && !noTranslate) return t(textNode)
		return textNode
	}
	const text = translate(children)

	return (
		<>
			{text !== '' && (
				<Text
					{...props}
					accessibilityRole={onPress ? 'button' : 'text'}
					style={[
						textStyle(variant, medium, theme.font),
						isMtavruli ? { textTransform: 'uppercase' } : {},
						style,
					]}>
					{text}
				</Text>
			)}
		</>
	)

	function textStyle(
		variant: Variant = 'l',
		medium: boolean = false,
		font: FontTheme
	): TextStyle {
		let curFont =
			medium || variant == 'headline' || variant == 'title'
				? font.medium
				: font.regular

		switch (variant) {
			case 's':
				return { fontSize: 11, lineHeight: 15, fontFamily: curFont }
			case 'm':
				return { fontSize: 12, lineHeight: 16, fontFamily: curFont }
			case 'l':
				return { fontSize: 14, lineHeight: 18, fontFamily: curFont }
			case 'title':
				return { fontSize: 16, lineHeight: 20, fontFamily: curFont }
			case 'headline':
				return { fontSize: 20, lineHeight: 24, fontFamily: curFont }
		}
	}
}

export default AppText
