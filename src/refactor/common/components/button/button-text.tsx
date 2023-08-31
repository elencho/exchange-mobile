import AppText from 'components/AppText'
import { CommonProps } from 'refactor/common/components/button'
import { COLORS_DARK } from 'refactor/common/theme/colors'

export type TextProps = {
	variant: 'text'
	subtext?: boolean
} & CommonProps

export function TextButton({
	text,
	onPress,
	style,
	disabled = false,
	subtext,
}: TextProps) {
	return (
		<AppText
			medium
			subtext={subtext}
			disabled={disabled}
			onPress={onPress}
			style={[
				{
					color: disabled
						? COLORS_DARK.buttonDisabled
						: COLORS_DARK.brandSecondary,
				},
				style,
			]}>
			{text}
		</AppText>
	)
}
