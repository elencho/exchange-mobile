import React, { Dispatch, SetStateAction } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import colors from '@app/constants/colors'
import AppText from '@app/refactor/common/components/text/index'
import { FilterState } from '../../transactions_history'

interface Props {
	activeTab: TabName
	setActiveTab: Dispatch<SetStateAction<TabName>>
	setIsFilterVisible: Dispatch<SetStateAction<FilterState>>
}

const TabSwitcher: React.FC<Props> = ({
	activeTab,
	setActiveTab,
	setIsFilterVisible,
}) => {
	const tabTextStyle = (tabName: TabName) => {
		return {
			color: activeTab === tabName ? colors.PRIMARY_TEXT : '#969CBF',
		}
	}
	const tabColor = (tabName: TabName) => {
		return {
			backgroundColor:
				activeTab === tabName ? colors.PRIMARY_PURPLE : colors.BUTTON_DISABLED,
		}
	}

	const handlePress = (tabName: TabName) => {
		setActiveTab(tabName)
		setIsFilterVisible({ isVisible: false, shouldFilter: true })
	}

	return (
		<View style={styles.container}>
			{['Transfer', 'Instant trade'].map((tabName: string) => (
				<Pressable
					key={tabName}
					style={[styles.tab, tabColor(tabName as TabName)]}
					onPress={() => handlePress(tabName as TabName)}>
					<AppText medium style={tabTextStyle(tabName as TabName)}>
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
