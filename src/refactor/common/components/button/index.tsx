import {
	AddButton,
	AddProps,
} from 'refactor/common/components/button/button-add'
import {
	PrimaryButton,
	PrimaryProps,
} from 'refactor/common/components/button/button-primary'
import {
	TextButton,
	TextProps,
} from 'refactor/common/components/button/button-text'
import { Component, Style } from 'refactor/common/components/types'

/*
 *  TODO: Remove AppButton.js, PurpleText.js
 *  TODO: Remove Dashed button in ManageCards.js, Whitelist.js
 */

type Variant = 'primary' | 'text' | 'add'
type Props = PrimaryProps | TextProps | AddProps

export interface CommonProps {
	variant: Variant
	text: string
	onPress: () => any
	disabled?: boolean
	style?: Style
}

export function Button(props: PrimaryProps): Component
export function Button(props: TextProps): Component
export function Button(props: AddProps): Component

export function Button(props: Props) {
	switch (props.variant) {
		case 'text':
			return TextButton(props as TextProps)
		case 'primary':
			return PrimaryButton(props as PrimaryProps)
		case 'add':
			return AddButton(props as AddProps)
	}
}
