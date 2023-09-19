import { CommonProps } from 'refactor/common/components/button'
import Text from 'refactor/common/components/text'
import { useTheme } from 'refactor/setup/theme/index.context'

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
		<Text
			variant="m"
			disabled={disabled}
			onPress={onPress}
			style={[
				{
					color: disabled
						? theme.color.buttonDisabled
						: theme.color.brandSecondary,
				},
				style,
			]}>
			{text}
		</Text>
	)
}
