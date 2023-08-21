import {
	AddButton,
	ButtonAddProps,
} from 'refactor/common/components/button/button-add'
import {
	ButtonPrimaryProps,
	PrimaryButton,
} from 'refactor/common/components/button/button-primary'
import {
	ButtonTextProps,
	TextButton,
} from 'refactor/common/components/button/button-text'
import { Style } from 'refactor/common/components/types'

/*
 *  TODO: Remove AppButton.js, PurpleText.js
 *  TODO: Remove Dashed button in ManageCards.js, Whitelist.js
 */

type ButtonVariant = 'primary' | 'text' | 'add'

export interface CommonProps {
	variant: ButtonVariant
	text: string
	onPress: () => any
	disabled?: boolean
	passedStyle?: Style
}

export type ButtonProps = CommonProps &
	(ButtonPrimaryProps | ButtonTextProps | ButtonAddProps)

export function Button(props: ButtonPrimaryProps): JSX.Element
export function Button(props: ButtonTextProps): JSX.Element
export function Button(props: ButtonAddProps): JSX.Element

export function Button(props: ButtonProps) {
	switch (props.variant) {
		case 'text':
			return TextButton(props as ButtonTextProps)
		case 'primary':
			return PrimaryButton(props as ButtonPrimaryProps)
		case 'add':
			return AddButton(props as ButtonAddProps)
	}
}
