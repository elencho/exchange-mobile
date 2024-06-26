import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Generate from '../../../assets/images/Wallet/Generate.svg'
import { GENERATE_WIRE_PDF } from '../../../constants/api'
import colors from '../../../constants/colors'
import images from '../../../constants/images'
import { fetchFee } from '../../../redux/trade/actions'
import { validateAmount } from '../../../utils/appUtils'
import { handleAmountInput } from '../../../utils/formUtils'
import { generateFile, cardDeposit } from '../../../utils/walletUtils'
import AppButton from '../../AppButton'
import AppInput from '../../AppInput'
import AppText from '../../AppText'
import CardSection from '../../InstantTrade/CardSection'
import ChooseBankModal from '../../InstantTrade/ChooseBankModal'
import ChooseCardModal from '../../InstantTrade/ChooseCardModal'
import Fee from '../Fee'
import StatusModal from '../StatusModal'
import BankInfo from './BankInfo'

export default function FiatBlock() {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)

	const {
		transactionsOld: { code },
		trade: {
			card,
			depositProvider,
			currentBalanceObj: { depositScale },
		},
		wallet: {
			wireDepositInfo: { en },
			wireDepositProvider,
			network,
			depositAmount,
		},
	} = state

	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [maxLength, setMaxLength] = useState(13)

	useEffect(() => {
		error && setError(false)
	}, [card, depositAmount, depositProvider, network])

	const editable = network !== 'ECOMMERCE' ? true : !!depositProvider && !!card
	const inputValidation = new RegExp(
		`^[0-9]{1,13}(\.|\\.[0-9]{1,${depositScale}})?$`
	)
	const providerBankId = en?.find((x) =>
		x.iconName.includes(wireDepositProvider)
	)?.id

	const generatePdf = () => {
		const pdfLink = `${GENERATE_WIRE_PDF}?currency=${code}&amount=${depositAmount}&wireDepositInfoId=${providerBankId}&timeZone=UTC`

		if (!validateAmount(depositAmount)) {
			setError(true)
		} else {
			generateFile(pdfLink, setLoading, 'wiredeposit', 'pdf')
		}
	}

	const setAmount = (amount) => {
		dispatch({
			type: 'SET_DEPOSIT_AMOUNT',
			depositAmount: amount,
		})
		if (
			(depositProvider && card) ||
			network === 'SWIFT' ||
			network === 'SEPA'
		) {
			dispatch(fetchFee('deposit'))
		}
	}

	const handleAmount = (text) =>
		handleAmountInput(
			text,
			inputValidation,
			depositScale,
			setMaxLength,
			setAmount
		)

	const deposit = async () => {
		if (!card || !depositProvider || !validateAmount(depositAmount)) {
			setError(true)
		} else {
			const params = {
				currency: code,
				cardId: card.id,
				amount: depositAmount,
				redirectUri: 'cryptal.com',
			}
			const data = await cardDeposit(params)
			data && dispatch({ type: 'SET_APP_WEBVIEW_OBJ', webViewObj: data })
		}
	}

	const marginTop = () => {
		if (network === 'ECOMMERCE') {
			return !depositProvider ? -20 : 0
		} else {
			return -10
		}
	}

	return (
		<View>
			{network !== 'ECOMMERCE' && (
				<View style={styles.block}>
					<BankInfo />
				</View>
			)}

			<View style={styles.mainBlock}>
				<>
					{network === 'ECOMMERCE' && (
						<>
							<View style={{ marginTop: -20 }}>
								<CardSection error={error} />
							</View>
							<ChooseBankModal />
							<ChooseCardModal />
							<StatusModal deposit />
						</>
					)}

					<AppInput
						onChangeText={handleAmount}
						value={depositAmount}
						style={{ marginTop: marginTop() }}
						keyboardType="numeric"
						maxLength={maxLength}
						label="Enter Amount"
						editable={editable}
						disabled={!editable}
						error={error && !validateAmount(depositAmount)}
					/>
				</>
			</View>

			<Fee />

			{network === 'SWIFT' || network === 'SEPA' ? (
				<AppButton
					text="Generate PDF"
					onPress={generatePdf}
					left={loading ? null : <Generate />}
					style={styles.button}
					loading={loading}
				/>
			) : (
				<AppButton text="Deposit" onPress={deposit} style={styles.button} />
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	block: {
		paddingTop: 6,
		paddingBottom: 22,
		marginBottom: 22,
	},
	button: {
		width: '100%',
		marginBottom: 46,
	},
	mainBlock: { marginBottom: 24 },
	dropdown: {
		borderColor: '#525A86',
		borderWidth: 1,
		alignItems: 'center',
		flexDirection: 'row',
		height: 45,
		paddingHorizontal: 15,
	},
	line: {
		width: 1,
		height: 20,
		backgroundColor: '#3B4160',
		marginLeft: 10,
		marginRight: 5,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	subtext: {
		color: colors.SECONDARY_TEXT,
		marginLeft: 10,
	},
})
