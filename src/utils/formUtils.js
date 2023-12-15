export const validateScale = (input, scale) => {
	if (!input) return true

	const isNumber = (input * 1).toString() !== 'NaN'

	if (isNumber) {
		if (input.split('.').length === 2) {
			return input.split('.')[1].length <= scale
		}
		if (!input.includes('.')) {
			return true
		}
	}
	return false
}

export const handleAmountInput = (
	text,
	regex,
	scale,
	setMaxLength,
	setAmount
) => {
	const getMaxLength = (replacedAmount) => {
		const factoredDigit = Math.trunc(replacedAmount)
		const factoredDigitLength = parseFloat(factoredDigit.toString().length)
		setMaxLength(factoredDigitLength + parseFloat(scale) + 1)
	}

	const replacedAmount = text?.trim().replace(',', '.')
	if (!regex.test(replacedAmount) && replacedAmount) {
		return
	}

	if (!validateScale(replacedAmount, scale)) {
		return
	}

	const startsWithZeroNoDecimal =
		replacedAmount[1] && replacedAmount[0] === '0' && replacedAmount[1] !== '.'
	const parts = replacedAmount.split('.')
	if (parts.length === 2 && scale == 0) {
		getMaxLength(replacedAmount)
		setAmount(replacedAmount ? parts[0].substr(0, 14) : 0)
	} else if (parts.length === 2) {
		getMaxLength(replacedAmount)
		setAmount(replacedAmount ? parts[0].substr(0, 14) + '.' + parts[1] : 0)
	} else if (startsWithZeroNoDecimal) {
		setMaxLength(2)
	} else {
		setMaxLength(14)
		setAmount(replacedAmount ? parts[0].substr(0, 13) : 0)
	}
}
