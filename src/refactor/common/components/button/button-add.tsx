import { View } from 'react-native'
import { CommonProps } from 'refactor/common/components/button'

export type AddProps = {
	a: string
} & CommonProps

export function AddButton({}: AddProps) {
	return <View></View> // TODO
}
