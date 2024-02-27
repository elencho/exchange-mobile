export const withdrawalParams = (state) => {
	const {
		transactionsOld: { code },
		wallet: {
			currentWhitelistObj,
			withdrawalAmount,
			withdrawalNote,
			network,
			memoTag,
		},
	} = state

	return {
		currency: code,
		amount: withdrawalAmount,
		address: currentWhitelistObj?.address?.trim(),
		addressTag: currentWhitelistObj?.tag ?? memoTag?.trim(),
		note: withdrawalNote,
		provider: network,
	}
}

export const wireWithdrawalParams = (state) => {
	const {
		transactionsOld: { code },
		wallet: {
			withdrawalBank: { id },
			network,
			withdrawalAmount,
			withdrawalNote,
			saveTemplate,
			newTemplateName,
			iban,
			receiverBank,
			intermediateBank,
			currentTemplate: { templateName, bankId },
		},
		profile: {
			userInfo: { country, city, postalCode, address },
		},
	} = state

	return {
		bankId: templateName === 'New Template' ? id : bankId,
		wireProvider: network,
		currency: code,
		amount: withdrawalAmount,
		country,
		city,
		postalCode,
		address,
		note: withdrawalNote,
		saveTemplate,
		templateName: newTemplateName,
		iban,
		receiverBank,
		intermediateBank,
	}
}

export const cardWithdrawalParams = (state) => {
	const {
		transactionsOld: { code },
		trade: { card },
		wallet: { withdrawalAmount },
	} = state

	return {
		currency: code,
		cardId: card.id,
		amount: withdrawalAmount,
		redirectUri: 'https://cryptal.com',
	}
}

export const maxWithdrawalParams = (state) => {
	const {
		transactionsOld: { code },
		trade: { card, currentBalanceObj, depositProvider },
		wallet: { network },
	} = state

	const provider = network === 'ECOMMERCE' ? depositProvider : network

	let method
	if (currentBalanceObj?.type === 'CRYPTO' || network === 'BEP20') {
		method = 'WALLET'
	} else {
		if (network === 'ECOMMERCE') {
			method = 'ECOMMERCE'
		} else {
			method = 'WIRE'
		}
	}

	return {
		currency: code,
		cardId: card?.id,
		provider,
		method,
	}
}

export const addWhitelistParams = (state) => {
	const {
		transactionsOld: { code },
		wallet: {
			newWhitelist: { name, address, tag },
			network,
		},
		trade: { currentBalanceObj },
	} = state

	const secondaryNetwork = Object.keys(currentBalanceObj?.infos)[0]

	return {
		currency: code,
		address,
		name,
		provider: network ?? secondaryNetwork,
		tag,
	}
}

export const editWhitelistParams = (state) => {
	const {
		wallet: {
			currentWhitelistObj: { name, id },
		},
	} = state

	return { name, id }
}
