import { AppButton } from '@components/button'
import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import React, { useEffect } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
	selectedType: TradeType
	onTypeChanged: (type: TradeType) => void
}

const trades: TradeType[] = ['Buy', 'Sell']

const TradeTypeSwitcher = ({ selectedType, onTypeChanged }: Props) => {
	const { styles, theme } = useTheme(_styles)

	const chooseBackgroundColor = (type: TradeType) => {
		if (type === selectedType) {
			return type === 'Buy' ? '#0CCBB5' : '#E0355D'
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
			{trades.map((type: TradeType) => (
				<Pressable
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
