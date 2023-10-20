import React from 'react'
import { Trans } from 'react-i18next'
import { Linking, StyleSheet, View } from 'react-native'
import Deactivate from '@assets/images/Deactivate.svg'
import { Theme, useTheme } from '@theme/index'
import { AppButton } from '@components/button'
import AppText from '@components/text'

const DEACTIVATE_LINK =
	'https://support.cryptal.com/hc/en-us/articles/360020438540-How-do-I-delete-my-Cryptal-Account-'

const DeleteAccount = () => {
	const { styles } = useTheme(_styles)
	const handlePress = () => {
		Linking.openURL(DEACTIVATE_LINK)
	}
	return (
		<View style={styles.container}>
			<Deactivate />
			<AppText style={styles.text}>
				<Trans
					i18nKey="deactivateAccount"
					defaults="<t>Contact support to</t>  <b>Deactivate Account</b>"
					components={{
						b: (
							<AppButton
								variant="text"
								text=""
								style={styles.textSec}
								onPress={handlePress}
							/>
						),
						t: <AppText />,
					}}
				/>
			</AppText>
		</View>
	)
}

export default DeleteAccount

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.color.backgroundPrimary,
			paddingLeft: 5,
			paddingVertical: 14,
			flexDirection: 'row',
			alignItems: 'center',
		},
		text: {
			color: theme.color.textSecondary,
			marginLeft: 18,
			flex: 1,
			lineHeight: 20,
		},
		textSec: {
			color: theme.color.redLite,
		},
	})
