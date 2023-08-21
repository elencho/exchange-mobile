import AppText from 'components/AppText'
import { CommonProps } from 'refactor/common/components/button'
import { COLORS_DARK } from 'refactor/common/theme/colors'

export type ButtonTextProps = {
	variant: 'text'
	subtext?: boolean
} & CommonProps

export function TextButton({
	text,
	onPress,
	passedStyle,
	disabled = false,
	subtext,
}: ButtonTextProps) {
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
				passedStyle,
			]}
			body={undefined}
			header={undefined}
			calendarDay={undefined}
			small={undefined}
			isForCodeInput={undefined}>
			{text}
		</AppText>
	)
}
