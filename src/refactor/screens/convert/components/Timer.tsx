import { formatDisplayPair } from '@app/refactor/screens/convert/util'
import Skeleton from '@components/skeleton'
import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import ProgressBar from 'react-native-animated-progress'

export const COUNTDOWN_SECONDS = 90

type Props = {
	seconds: number
	setSeconds: (sec: number) => void
	pair?: CoinPair
	loading: boolean
	tradeType: TradeType
	onTimerExpired: () => void
}

const Timer = ({
	seconds,
	setSeconds,
	pair,
	loading,
	tradeType,
	onTimerExpired,
}: Props) => {
	const { styles, theme } = useTheme(_styles)

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

		return (
			<View style={styles.textContainer}>
				<AppText style={styles.textCoins}>
					{formatDisplayPair(pair, tradeType) + ' - Updates in:'}
				</AppText>
				<AppText style={styles.textSeconds}>{` ${minStr}:${secStr}`}</AppText>
			</View>
		)
	}

	return loading || !pair ? (
		<Skeleton height={70} style={{ marginTop: 22, borderRadius: 6 }} />
	) : (
		<View style={styles.container}>
			<ProgressBar
				backgroundColor={theme.color.brandPrimary}
				trackColor={theme.color.textSecondary}
				height={3}
				progress={100 - (100 / COUNTDOWN_SECONDS) * seconds}
			/>
			<TimerText />
		</View>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			minHeight: 70,
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
