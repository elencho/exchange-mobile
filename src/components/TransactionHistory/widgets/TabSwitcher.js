import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '@app/refactor/redux/transactions/transactionSlice'
import colors from '../../../constants/colors'
import AppText from '../../AppText'

const TabSwitcher = () => {
	const dispatch = useDispatch()
	const activeTab = useSelector((state) => state.transactionsOld.activeTab)

	const tabTextStyle = (tabName) => {
		return {
			color: activeTab === tabName ? colors.PRIMARY_TEXT : '#969CBF',
		}
	}
	const tabColor = (tabName) => {
		return {
			backgroundColor:
				activeTab === tabName ? colors.PRIMARY_PURPLE : colors.BUTTON_DISABLED,
		}
	}

	const handleTabPress = (tabName) => dispatch(setActiveTab(tabName))

	return (
		<View style={styles.container}>
			{['Transfer', 'Instant trade'].map((tabName) => (
				<Pressable
					key={tabName}
					style={[styles.tab, tabColor(tabName)]}
					onPress={() => handleTabPress(tabName)}>
					<AppText medium style={tabTextStyle(tabName)}>
						{tabName}
					</AppText>
				</Pressable>
			))}
		</View>
	)
}

export default TabSwitcher

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 10,
		marginTop: 10,
	},
	tab: {
		flex: 1,
		height: 38,
		borderRadius: 40,
		backgroundColor: colors.BUTTON_DISABLED,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
