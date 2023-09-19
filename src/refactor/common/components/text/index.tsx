import { FontTheme } from 'refactor/setup/theme/fonts'
import { useTheme } from 'refactor/setup/theme/index.context'
import { Text as NativeText, TextProps, TextStyle } from 'react-native'
import useTranslate from 'refactor/common/components/text/use-translate'
import { memo } from 'react'

type Variant = 's' | 'm' | 'l' | 'title' | 'headline'

type Props = TextProps & {
	variant?: Variant
}

const Text: React.FC<Props> = (props) => {
	const { variant, children, onPress, style } = props
	const text = useTranslate(children)

	const { theme } = useTheme()

	return (
		<>
			{text !== '' && (
				<NativeText
					accessibilityRole={onPress ? 'button' : 'text'}
					style={[textStyle(variant, theme.font), style]}
					{...props}>
					{text}
				</NativeText>
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

export default memo(Text)
