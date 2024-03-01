import AppModal from '@components/modal'
import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'

type Props = {
	visible: boolean
	dismiss: () => void
}

const InfoModal = ({ visible, dismiss }: Props) => {
	const { styles } = useTheme(_styles)

	const children = (
		<ScrollView
			showsVerticalScrollIndicator={false}
			style={{ marginTop: 30, paddingHorizontal: 0 }}>
			<TouchableOpacity activeOpacity={0.99}>
				<AppText variant="headline" style={styles.header}>
					cn_info_how_title
				</AppText>
				<AppText variant="l" style={styles.text}>
					cn_info_how_desc_1
				</AppText>
				<AppText variant="l" style={styles.text}>
					cn_info_how_desc_2
				</AppText>
				<AppText variant="l" style={styles.text}>
					cn_info_how_desc_3
				</AppText>
				<AppText variant="l" style={styles.text}>
					cn_info_how_desc_4
				</AppText>
			</TouchableOpacity>
		</ScrollView>
	)

	return (
		<AppModal hide={dismiss} visible={visible} fullScreen children={children} />
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		header: {
			color: '#C0C5E0',
		},
		text: {
			color: theme.color.textSecondary,
			marginTop: 15,
		},
	})

export default InfoModal
