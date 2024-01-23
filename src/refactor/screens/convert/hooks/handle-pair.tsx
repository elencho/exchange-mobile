import { useState } from 'react'

export const handlePair = () => {
	const [upCoin, setUpCoin] = useState<Coin>()
	const [upAmount, setUpAmount] = useState('')
	const [lowCoin, setLowCoin] = useState<Coin>()
	const [lowAmount, setLowAmount] = useState('')
	const [lastChanged, setLastChanged] = useState<Position | null>(null)
	const [lastClicked, setLastClicked] = useState<Position | null>(null)
	const [errorInputs, setErrorInputs] = useState<Position[]>([])
	const [errorText, setErrorText] = useState<string>()

	return {
		upCoin,
		setUpCoin,
		upAmount,
		setUpAmount,
		lowCoin,
		setLowCoin,
		lowAmount,
		setLowAmount,
		lastChanged,
		setLastChanged,
		lastClicked,
		setLastClicked,
		errorInputs,
		setErrorInputs,
		errorText,
		setErrorText,
	}
}
