import { convertColors } from '@app/refactor/screens/convert/util'
import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

type Props = {
	selectedType: TradeType
	onTypeChanged: (type: TradeType) => void
}

const TradeTypeSwitcher = ({ selectedType, onTypeChanged }: Props) => {
	const { styles, theme } = useTheme(_styles)
	const tradesToDraw: TradeType[] = ['Buy', 'Sell']

	const chooseBackgroundColor = (type: TradeType) => {
		if (type === selectedType) {
			return type === 'Buy' ? convertColors.buy : convertColors.sell
		}
		return theme.color.backgroundSecondary
	}

	const chooseTextColor = (type: TradeType) => {
		return type === selectedType
			? theme.color.textPrimary
			: theme.color.textThird
	}

	return (
		<View style={styles.container}>
			{tradesToDraw.map((type: TradeType) => (
				<Pressable
					key={type}
					style={[
						styles.button,
						{ backgroundColor: chooseBackgroundColor(type) },
					]}
					onPress={() => {
						type !== selectedType && onTypeChanged(type)
					}}>
					<AppText
						style={[
							styles.text,
							{
								color: chooseTextColor(type),
							},
						]}
						variant="l">
						{type}
					</AppText>
				</Pressable>
			))}
		</View>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			alignContent: 'stretch',
			height: 40,
			borderRadius: 40,
			backgroundColor: theme.color.backgroundSecondary,
			flexDirection: 'row',
		},
		button: {
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 40,
			flex: 1,
		},
		text: {
			color: theme.color.textPrimary,
		},
	})

export { TradeTypeSwitcher }
