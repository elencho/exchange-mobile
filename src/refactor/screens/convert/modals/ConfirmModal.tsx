import AppModal from '@components/modal'
import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import Success from '@assets/images/Instant_Status_Success.svg'
import Pending from '@assets/images/Instant_Status_Pending.svg'
import Error from '@assets/images/Instant_Status_Error.svg'
import { AppButton } from '@components/button'

interface Props {
	status: ConfirmModalStatus | undefined
	onTransactionsClick: () => void
	dismiss: () => void
}

const ConfirmModal = ({ status, onTransactionsClick, dismiss }: Props) => {
	const { styles } = useTheme(_styles)

	const children = () => {
		const image =
			status === 'success' ? (
				<Success />
			) : status === 'pending' ? (
				<Pending />
			) : (
				<Error />
			)

		return (
			<View style={styles.container}>
				{image}
				<AppText variant="title" style={styles.title} medium>
					{'Transaction ' + status}
				</AppText>
				<AppText variant="l" style={styles.desc}>
					{'Description = ???'}
				</AppText>

				{(status === 'success' || status === 'pending') && (
					<AppButton
						variant="primary"
						text="See Transactions"
						style={styles.button}
						onPress={onTransactionsClick}
					/>
				)}
			</View>
		)
	}

	return (
		<AppModal
			hide={dismiss}
			visible={status !== undefined}
			children={children()}
			bottom
		/>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			alignItems: 'center',
		},
		title: {
			marginTop: 18,
			color: theme.color.textPrimary,
		},
		desc: {
			marginTop: 10,
			marginBottom: 30,
			color: theme.color.textSecondary,
		},
		button: {
			width: '60%',
			marginBottom: 10,
		},
	})

export default ConfirmModal
