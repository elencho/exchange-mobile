import React, { memo, useMemo } from 'react'
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import colors from '../../../constants/colors'
import { toggleChooseAddressModal } from '../../../redux/modals/actions'
import { chooseWhitelist } from '../../../redux/wallet/actions'
import AppModal from '../../AppModal'
import AppText from '../../AppText'

function ChooseAddressModal() {
	const dispatch = useDispatch()
	const state = useSelector((state) => state)
	const {
		modals: { chooseAddressModalVisible },
		wallet: { whitelist, network, currentWhitelistObj },
	} = state

	const hide = () => dispatch(toggleChooseAddressModal(false))
	const choose = (whitelist) => {
		dispatch(chooseWhitelist(whitelist))
		hide()
	}

	const background = (w) => {
		if (w.id === currentWhitelistObj.id) {
			return {
				backgroundColor: 'rgba(101, 130, 253, 0.1)',
				borderRadius: 5,
			}
		}
	}

	const addressFormat = (address) => {
		if (address.length > 15)
			return `${address.substring(0, 5)}...${address.substring(
				address.length - 5
			)}`
		else return address
	}

	// useEffect(() => {
	//   dispatch(chooseWhitelist({}));
	// }, [network]);

	const children = useMemo(
		() => (
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={styles.scrollView}>
				{whitelist?.map((w) => (
					<View key={w.id}>
						{network === w.provider && (
							<TouchableOpacity
								style={[styles.pressable, background(w)]}
								onPress={() => choose(w)}>
								<View style={styles.flex}>
									<Text style={styles.primary}>{w.name}</Text>
									<Text style={styles.secondary} numberOfLines={1}>
										{addressFormat(w.address)}
									</Text>
								</View>

								<View style={styles.right}>
									<AppText subtext style={{ color: '#C0C5E0' }}>
										{w.provider}
									</AppText>
									{w.tag && (
										<AppText subtext style={{ color: colors.SECONDARY_TEXT }}>
											{w.tag}
										</AppText>
									)}
								</View>
							</TouchableOpacity>
						)}
					</View>
				))}
			</ScrollView>
		),
		[whitelist, network, currentWhitelistObj]
	)

	return (
		<AppModal
			visible={chooseAddressModalVisible}
			hide={hide}
			title="Choose Address"
			bottom
			children={children}
		/>
	)
}
export default memo(ChooseAddressModal)

const styles = StyleSheet.create({
	pressable: {
		paddingVertical: 14,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		borderRadius: 5,
	},

	flex: {
		flex: 1,
		marginRight: 20,
	},
	primary: {
		color: colors.PRIMARY_TEXT,
		fontFamily: 'Ubuntu_Medium',
	},
	secondary: {
		color: colors.SECONDARY_TEXT,
		marginTop: 5,
		lineHeight: 15,
		fontSize: 12,
	},
	right: {
		alignItems: 'flex-end',
		justifyContent: 'space-between',
	},
	scrollView: {
		maxHeight: 200,
	},
})
