import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import Menu from '../../../assets/images/Wallet/Menu.svg'
import colors from '../../../constants/colors'
import { toggleWhitelistActionsModal } from '../../../redux/modals/actions'
import { chooseWhitelist, setNetwork } from '../../../redux/wallet/actions'
import AppText from '../../AppText'

export default function WhitelistItem({ whitelistItem }) {
	const { name, address, tag, provider } = whitelistItem
	const dispatch = useDispatch()

	const openModal = () => {
		dispatch(chooseWhitelist(whitelistItem))
		dispatch(setNetwork(provider))
		dispatch(toggleWhitelistActionsModal(true))
	}

	return (
		<View style={styles.container}>
			<View style={styles.flex}>
				<View style={styles.row}>
					<AppText body style={styles.primary}>
						{`${name} `}
					</AppText>
					{tag && (
						<View style={styles.row}>
							<AppText body style={styles.primary}>
								{`/ Tag :`}
							</AppText>
							<AppText body style={styles.primary}>
								{` ${tag}`}
							</AppText>
						</View>
					)}
				</View>
				<AppText subtext style={styles.secondary}>
					{address}
				</AppText>
			</View>

			<TouchableOpacity onPress={openModal} style={styles.menu}>
				<Menu />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 12,
	},
	flex: {
		flex: 1,
	},
	menu: {
		width: 30,
		height: 30,
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
	primary: {
		color: colors.PRIMARY_TEXT,
	},
	secondary: {
		color: colors.SECONDARY_TEXT,
		marginTop: 5,
	},
	row: {
		flexDirection: 'row',
	},
})
