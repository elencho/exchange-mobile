import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, TextProps, TextStyle } from 'react-native'
import { FontTheme } from '@theme/fonts'
import { useTheme } from '@theme/index'

type Variant = 's' | 'm' | 'l' | 'title' | 'headline'

type Props = TextProps & {
	variant?: Variant
}

const AppText: React.FC<Props> = (props) => {
	const { variant, children, onPress, style } = props
	const { theme } = useTheme()

	const translate = (textNode: ReactNode) => {
		const { t } = useTranslation()
		if (typeof textNode === 'string') return t(textNode)
		return textNode
	}
	const text = translate(children)

	return (
		<>
			{text !== '' && (
				<Text
					{...props}
					accessibilityRole={onPress ? 'button' : 'text'}
					style={[textStyle(variant, theme.font), style]}>
					{text}
				</Text>
			)}
		</>
	)

	function textStyle(variant: Variant = 'l', font: FontTheme): TextStyle {
		switch (variant) {
			case 's':
				return { fontSize: 11, lineHeight: 15, fontFamily: font.regular }
			case 'm':
				return { fontSize: 12, lineHeight: 16, fontFamily: font.regular }
			case 'l':
				return { fontSize: 14, lineHeight: 18, fontFamily: font.regular }
			case 'title':
				return { fontSize: 16, lineHeight: 20, fontFamily: font.medium } // TODO
			case 'headline':
				return { fontSize: 20, lineHeight: 24, fontFamily: font.medium }
		}
	}
}

export default AppText
