import { useTheme } from '@theme/index'
import { CommonProps } from '@components/button'
import AppText from '@components/text'

export type TextProps = {
	variant: 'text'
} & CommonProps

export function TextButton({
	text,
	onPress,
	style,
	disabled = false,
}: TextProps) {
	const { theme } = useTheme()

	return (
		<AppText
			variant="l"
			medium={true}
			disabled={disabled}
			onPress={onPress}
			style={[
				{
					color: disabled ? theme.color.tabTagHint : theme.color.brandSecondary,
				},
				style,
			]}>
			{text}
		</AppText>
	)
}
