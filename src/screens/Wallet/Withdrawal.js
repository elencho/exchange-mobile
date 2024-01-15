import React, { useEffect, useState, memo, useCallback } from 'react'
import { Trans } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { MaterialIndicator } from 'react-native-indicators'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import AppButton from '../../components/AppButton'
import AppInfoBlock from '../../components/AppInfoBlock'
import AppText from '../../components/AppText'
import ChooseNetworkDropdown from '../../components/Wallet/Deposit/ChooseNetworkDropdown'
import FlexBlock from '../../components/Wallet/Deposit/FlexBlock'
import TransferMethodDropdown from '../../components/Wallet/Deposit/TransferMethodDropdown'
import TransferMethodModal from '../../components/Wallet/Deposit/TransferMethodModal'
import WalletCoinsDropdown from '../../components/Wallet/Deposit/WalletCoinsDropdown'
import SaveAsTemplate from '../../components/Wallet/Withdrawal/SaveAsTemplate'
import WithdrawalConfirmModal from '../../components/Wallet/Withdrawal/WithdrawalConfirmModal'
import WithdrawalInfo from '../../components/Wallet/Withdrawal/WithdrawalInfo'
import WithdrawalInputs from '../../components/Wallet/Withdrawal/WithdrawalInputs'
import WithKeyboard from '../../components/WithKeyboard'
import { infos, warnings } from '../../constants/warningsAndInfos'
import { fetchFee, setCard, setFee } from '../../redux/trade/actions'
import { setNetwork } from '../../redux/wallet/actions'
import { withdrawalTemplatesAction } from '../../redux/wallet/actions'
import { validateAmount } from '../../utils/appUtils'

function Withdrawal({ refreshControl }) {
	const dispatch = useDispatch()
	const state = useSelector((state) => state, shallowEqual)
	const {
		trade: { currentBalanceObj, card, depositProvider, cardsLoading },
		transactionsOld: { code, loading },
		profile: { userInfo },
		wallet: {
			withdrawalRestriction,
			currentWhitelistObj,
			currentTemplate,
			withdrawalBank,
			iban,
			network,
			withdrawalAmount,
			whitelistLoading,
			receiverBank,
			memoTag,
			saveTemplate,
			newTemplateName,
		},
	} = state

	const [hasRestriction, setHasRestriction] = useState(false)
	const [hasMethod, setHasMethod] = useState(false)
	const [error, setError] = useState(false)

	const isFiat = currentBalanceObj.type === 'FIAT'
	const isCrypto = currentBalanceObj.type === 'CRYPTO'
	const isEcommerce = network === 'ECOMMERCE'
	const infoMessage = currentBalanceObj?.infos?.[network]?.walletInfo
	const walletInfo = () => {
		if (infoMessage && hasMethod && !hasRestriction) {
			return (
				<Trans
					i18nKey={infoMessage}
					components={{
						light: <AppText style={{ color: '#FFFBF3' }} />,
						gold: <AppText style={{ color: '#F2DFB4' }} />,
					}}
				/>
			)
		}
	}

	useEffect(() => {
		const m = currentBalanceObj.withdrawalMethods

		if (m.ECOMMERCE) {
			dispatch(setNetwork('ECOMMERCE'))
		} else {
			if (m.WALLET) dispatch(setNetwork(m.WALLET[0].provider))
			if (m.WIRE) dispatch(setNetwork(m.WIRE[0].provider))
		}

		setHasMethod(
			isFiat && network !== 'BEP20'
				? !!Object.keys(m).length
				: !!Object.keys(m).includes('WALLET')
		)
	}, [code])

	useEffect(() => {
		dispatch({ type: 'CLEAN_WALLET_INPUTS' })
		dispatch(setFee(null))
		if (
			(isEcommerce && card && depositProvider) ||
			(!isFiat &&
				network !== 'BEP20' &&
				currentBalanceObj?.withdrawalMethods?.WALLET)
		) {
			dispatch(fetchFee('withdrawal'))
		}
		if (
			currentBalanceObj.withdrawalMethods.WIRE &&
			!currentBalanceObj.withdrawalMethods.ECOMMERCE
		) {
			dispatch(withdrawalTemplatesAction())
			dispatch(fetchFee('withdrawal'))
		}
	}, [network, depositProvider, card])

	useEffect(() => {
		setHasRestriction(Object.keys(withdrawalRestriction).length)
	}, [withdrawalRestriction])
	useEffect(() => {
		return () => dispatch(setCard(null))
	}, [])

	useEffect(() => {
		error && setError(false)
	}, [
		depositProvider,
		card,
		withdrawalAmount,
		currentWhitelistObj,
		currentTemplate,
		withdrawalBank,
		iban,
		memoTag,
		receiverBank,
		userInfo,
	])

	const { swift } = receiverBank
	const receiverBankInputs = [iban, swift]

	const notEmpty = useCallback(() => {
		if (saveTemplate) {
			return !!newTemplateName.trim()
		}
		if (withdrawalBank?.bankName === 'Other')
			return (
				receiverBankInputs.every((i) => i && i.trim()) ||
				(saveTemplate && !!newTemplateName.length)
			)
		if (withdrawalBank?.bankName || currentTemplate?.templateName)
			return iban?.trim()
	}, [saveTemplate, withdrawalBank, currentTemplate, receiverBankInputs])

	const withdraw = () => {
		const length = Object.keys(currentWhitelistObj)?.length
		const tag = () => {
			const tagCondition =
				currentBalanceObj?.infos[network]?.transactionRecipientType ===
				'ADDRESS_AND_TAG'
			if (tagCondition)
				return currentWhitelistObj?.tag?.trim() || memoTag?.trim()
			return true
		}

		let condition
		if (isEcommerce) {
			condition = !validateAmount(withdrawalAmount) || !card || !depositProvider
		} else if (isFiat && network !== 'BEP20') {
			condition = !validateAmount(withdrawalAmount) || !notEmpty()
		} else {
			condition = !validateAmount(withdrawalAmount) || !length || !tag()
		}

		if (condition) {
			setError(true)
		} else {
			dispatch({
				type: 'TOGGLE_WITHDRAWAL_CONFIRM_MODAL',
				withdrawalConfirmModalVisible: true,
			})
		}
	}

	const saveTemplateCheck = useCallback(() => {
		return (
			currentTemplate.templateName === 'New Template' &&
			Object.keys(withdrawalBank).length
		)
	}, [currentTemplate, withdrawalBank])

	const reason = () => {
		if (withdrawalRestriction.reason) {
			return withdrawalRestriction.reason
		}
		return 'METHOD'
	}
	return (
		<>
			{cardsLoading || loading || whitelistLoading ? (
				<MaterialIndicator color="#6582FD" animationDuration={3000} />
			) : (
				<WithKeyboard flexGrow padding refreshControl={refreshControl}>
					<View style={styles.block}>
						<WalletCoinsDropdown />
						{!isCrypto && <TransferMethodDropdown />}

						{!hasRestriction && hasMethod && (
							<>
								{isFiat ? (
									<>
										{network !== 'BEP20' && (
											<>
												{network === 'SWIFT' && (
													<View style={{ marginTop: 10, marginBottom: -16 }}>
														<AppInfoBlock
															content={warnings.swift.withdrawal}
															warning
														/>
													</View>
												)}
												{network === 'SEPA' && (
													<AppInfoBlock content={warnings.sepa} warning />
												)}
												{network === 'ECOMMERCE' && (
													<AppInfoBlock
														content={infos.ecommerce.withdrawal}
														info
													/>
												)}
											</>
										)}
									</>
								) : (
									<ChooseNetworkDropdown />
								)}

								<TransferMethodModal />

								{walletInfo() && (
									<AppInfoBlock content={[walletInfo()]} warning />
								)}
							</>
						)}
					</View>

					{!hasRestriction &&
						isFiat &&
						network !== 'BEP20' &&
						hasMethod &&
						!isEcommerce &&
						network !== 'BEP20' && <WithdrawalInfo error={error} />}

					{!hasRestriction && hasMethod && (
						<WithdrawalInputs
							error={error}
							isFiat={isFiat && network !== 'BEP20'}
							hasRestriction={hasRestriction}
							notEmpty={notEmpty}
						/>
					)}
					{saveTemplateCheck() ? <SaveAsTemplate error={error} /> : null}

					{hasRestriction || !hasMethod ? (
						<FlexBlock
							type="Withdrawal"
							reason={reason()}
							restrictedUntil={withdrawalRestriction.restrictedUntil}
						/>
					) : null}

					{!hasRestriction &&
						hasMethod && ( // Button
							<AppButton
								style={styles.button}
								text="Withdrawal"
								onPress={withdraw}
							/>
						)}
				</WithKeyboard>
			)}
			<WithdrawalConfirmModal />
		</>
	)
}
export default memo(Withdrawal)

const styles = StyleSheet.create({
	block: {
		paddingBottom: 18,
	},
	// button: { marginBottom: 46 },
})
