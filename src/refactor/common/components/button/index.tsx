import { StyleProp, TextStyle } from 'react-native'
import { AddProps, AddButton } from '@components/button/button-add'
import { PrimaryProps, PrimaryButton } from '@components/button/button-primary'
import { TextProps, TextButton } from '@components/button/button-text'
import { Element } from '@components/types'

/*
 *  TODO: Remove AppButton.js, PurpleText.js
 *  TODO: Remove Dashed button in ManageCards.js, Whitelist.js
 */

type Variant = 'primary' | 'text' | 'add'
type Props = PrimaryProps | TextProps | AddProps

export interface CommonProps {
	variant: Variant
	text: string
	onPress?: () => any
	disabled?: boolean
	style?: StyleProp<TextStyle>
}

export function AppButton(props: PrimaryProps): Element
export function AppButton(props: TextProps): Element
export function AppButton(props: AddProps): Element

export function AppButton(props: Props) {
	switch (props.variant) {
		case 'text':
			return TextButton(props as TextProps)
		case 'primary':
			return PrimaryButton(props as PrimaryProps)
		case 'add':
			return AddButton(props as AddProps)
	}
}
