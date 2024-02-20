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
	dismiss: () => void
	onTransactionsClick?: () => void
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

		const desc =
			status === 'success'
				? null
				: status === 'pending'
				? 'pending description'
				: 'error description'

		return (
			<View style={styles.container}>
				{image}
				<AppText variant="title" style={styles.title} medium>
					{'Transaction ' + status}
				</AppText>
				{desc && (
					<AppText variant="l" style={styles.desc}>
						{desc}
					</AppText>
				)}

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
			marginBottom: 10,
			color: theme.color.textPrimary,
		},
		button: {
			marginTop: 20,
			width: '60%',
			marginBottom: 10,
		},
	})

export default ConfirmModal
