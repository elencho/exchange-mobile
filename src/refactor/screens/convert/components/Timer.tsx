import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import ProgressBar from 'react-native-animated-progress'

const COUNTDOWN_SECONDS = 90

type Props = {
	pair: CoinPair
	tradeType: TradeType
	onTimerExpired: () => void
}

const Timer = ({ pair, tradeType, onTimerExpired }: Props) => {
	const { styles, theme } = useTheme(_styles)

	const [seconds, setSeconds] = useState(COUNTDOWN_SECONDS)

	useEffect(() => {
		if (!seconds) {
			onTimerExpired()
			setSeconds(COUNTDOWN_SECONDS)
			return
		}

		const id = setInterval(() => {
			setSeconds(seconds - 1)
		}, 1000)

		return () => clearInterval(id)
	}, [seconds])

	const TimerText = () => {
		const min = Math.floor(seconds / 60)
		const sec = seconds % 60
		const minStr = min ? '01' : '00'
		const secStr = sec < 10 ? '0' + sec : sec

		const price = tradeType === 'Buy' ? pair.buyPrice : pair.sellPrice

		return (
			<View style={styles.textContainer}>
				<AppText style={styles.textCoins}>
					{'1 ' +
						pair.fiat.displayCcy +
						' = ' +
						price +
						' ' +
						pair.crypto.displayCcy +
						' - Updates in:'}
				</AppText>
				<AppText style={styles.textSeconds}>{` ${minStr}:${secStr}`}</AppText>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<ProgressBar
				backgroundColor={theme.color.brandPrimary}
				trackColor={theme.color.textSecondary}
				height={3}
				progress={100 - (100 / 90) * seconds}
			/>
			<TimerText />
		</View>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			paddingTop: 20,
			paddingHorizontal: 16,
			marginTop: 22,
			borderRadius: 6,
			backgroundColor: theme.color.backgroundSecondary,
		},
		textContainer: {
			marginVertical: 15,
			flexDirection: 'row',
		},
		textCoins: {
			color: theme.color.textThird,
		},
		textSeconds: {
			color: theme.color.textPrimary,
		},
	})

export { Timer }
