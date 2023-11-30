import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../../assets/images/Card.svg'
import Euro from '../../../assets/images/Euro.svg'
import Bank from '../../../assets/images/LocalBank.svg'
import colors from '../../../constants/colors'
import { toggleChooseNetworkModal } from '../../../redux/modals/actions'
import AppDropdown from '../../AppDropdown'
import AppText from '../../AppText'

export default function ChooseNetworkDropdown({
	disabled = false,
	error,
	style,
}) {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const {
		wallet: { hasMultipleNetworks, network, walletTab },
		trade: { currentBalanceObj },
		transactionsOld: { code },
	} = state
	// const uri = `${ICONS_URL_PNG}/${network}.png`;

	const cur = currentBalanceObj
	const isFiat = cur?.type === 'FIAT'

	const m = walletTab === 'Withdrawal' ? 'withdrawalMethods' : 'depositMethods'

	const handleDropdown = () => dispatch(toggleChooseNetworkModal(true))

	const isAvailable = () => {
		if (Object.keys(cur).length) {
			return !!Object.keys(cur[m]).length
		}
		return false
	}

	const networkName = () => {
		const currentNetwork = isFiat
			? currentBalanceObj?.depositMethods?.WIRE?.filter(
					(item) => item.provider === network
			  )
			: currentBalanceObj?.supportedProviders?.WALLET?.filter(
					(item) => item.provider === network
			  ) ||
			  currentBalanceObj?.supportedProviders?.WIRE?.filter(
					(item) => item.provider === network
			  )

		return (
			<AppText
				medium
				body
				style={disabled && { color: 'rgba(255, 255, 255, 0.6)' }}>
				{currentNetwork?.[0]?.displayName}
			</AppText>
		)
	}

	const NetworkWithTicker = () => (
		<AppText medium style={[styles.dropdownText, dropdownText]}>
			{networkName()}
			{'  '}
			<AppText
				style={[
					styles.secondary,
					disabled && { color: 'rgba(105, 111, 142, 0.4)' },
				]}>
				{isFiat ? '' : network === 'MAINNET' ? `(${code})` : `(${network})`}
			</AppText>
		</AppText>
	)

	const dropdownText = {
		color:
			error && !network
				? '#F45E8C'
				: disabled
				? colors.SECONDARY_TEXT
				: colors.PRIMARY_TEXT,
	}

	const renderIcon = (network) => {
		if (network === 'ECOMMERCE') {
			return <Card />
		}
		if (network === 'SWIFT') {
			return <Bank />
		}
		if (network === 'SEPA') {
			return <Euro />
		}
	}

	return (
		<>
			{isAvailable() && (
				<>
					{hasMultipleNetworks ? (
						<AppDropdown
							notClearable
							label="Choose Network"
							withLabel
							style={[styles.dropdown, style]}
							icon={renderIcon(network)}
							handlePress={handleDropdown}
							error={error && !network}
							selectedText={network && <NetworkWithTicker />}
							disabled={disabled}
						/>
					) : (
						<View style={styles.view}>
							<View>{renderIcon(network)}</View>
							<NetworkWithTicker />
						</View>
					)}
				</>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	dropdownText: {
		flex: 1,
		marginRight: 12,
		gap: 6,
	},
	view: {
		height: 45,
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 20,
		backgroundColor: 'rgba(149, 164, 247, 0.04)',
		paddingHorizontal: 22,
	},
	dropdown: {
		marginTop: 28,
	},
	iconDimensions: {
		width: 18,
		height: 18,
	},
	image: {
		marginLeft: 5,
		marginRight: 12,
		resizeMode: 'contain',
	},
	secondary: {
		color: colors.SECONDARY_TEXT,
	},
	ticker: { marginLeft: 6, color: colors.SECONDARY_TEXT },

	subtext: {
		transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
		position: 'absolute',
		left: -5,
		top: -8,
		paddingHorizontal: 8,
		backgroundColor: colors.PRIMARY_BACKGROUND,
	},
})
