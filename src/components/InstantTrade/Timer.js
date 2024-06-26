import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ProgressBar from 'react-native-animated-progress'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../constants/colors'
import { instantTradeTabAction } from '../../redux/trade/actions'
import AppText from '../AppText'

export default function Timer() {
	const dispatch = useDispatch()
	const tradeType = useSelector((state) => state.trade.tradeType)
	const [seconds, setSeconds] = useState(90)

	const { t } = useTranslation()

	useEffect(() => {
		if (!seconds) {
			// dispatch({ type: 'REFRESH_WALLET_AND_TRADES' });
			dispatch(instantTradeTabAction())
			setSeconds(90)
		}

		const intervalId = setInterval(() => {
			setSeconds(seconds - 1)
		}, 1000)

		return () => clearInterval(intervalId)
	}, [seconds])

	const timeFormat = (duration) => {
		const mins = ~~((duration % 3600) / 60)
		const secs = ~~duration % 60

		let ret = ''

		ret += '' + mins + ':' + (secs < 10 ? '0' : '')
		ret += '' + secs
		return ret
	}

	const progress = (seconds) => {
		return 100 - (100 / 90) * seconds
	}

	const trackColor = tradeType === 'Buy' ? '#0CCBB5' : '#E0355D'
	const min = timeFormat(seconds).split(':')[0]
	const sec = timeFormat(seconds).split(':')[1]

	return (
		<>
			<ProgressBar
				backgroundColor={trackColor}
				trackColor="rgba(131, 157, 180, 0.23)"
				height={3}
				progress={progress(seconds)}
			/>
			<AppText style={{ marginTop: 10, color: '#C0C5E0' }} subtext body>
				{t('priceUpdate')}{' '}
				{min > 0 && (
					<AppText style={{ color: colors.PRIMARY_TEXT }}>{min}:</AppText>
				)}
				<AppText
					style={{ color: seconds <= 30 ? '#F45E8C' : colors.PRIMARY_TEXT }}>
					{sec}
				</AppText>
			</AppText>
		</>
	)
}
