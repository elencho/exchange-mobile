import { View } from 'react-native'
import { CommonProps } from 'refactor/common/components/button'

export type ButtonAddProps = {
	variant: 'add'
	a: string
} & CommonProps

export function AddButton({}: ButtonAddProps) {
	return <View></View> // TODO
}
