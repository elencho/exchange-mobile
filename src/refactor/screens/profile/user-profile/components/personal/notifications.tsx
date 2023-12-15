import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppSwitcher from '@components/switcher'
import AppText from '@components/text'

interface NotificationsProps {
	styles: StyleSheet.NamedStyles<any>
	// TODO change any
	onToggle: (val: any) => void
	isOn: boolean
}

export const Notifications = (props: NotificationsProps) => {
	const { styles, onToggle, isOn } = props
	return (
		<View style={styles.row}>
			<AppText variant="m" style={[styles.white, { maxWidth: '80%' }]}>
				Receive Notifications
			</AppText>
			<View style={[styles.flex, { alignItems: 'flex-end' }]}>
				<AppSwitcher onToggle={onToggle} isOn={isOn} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({})
