import AppModal from '@components/modal'
import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import Success from '@assets/images/Instant_Status_Success.svg'
import Pending from '@assets/images/Instant_Status_Pending.svg'
import Error from '@assets/images/Instant_Status_Error.svg'
import { AppButton } from '@components/button'

interface Props {
	visible: boolean
	status: ConfirmModalStatus | undefined
	dismiss: () => void
	onTransactionsClick?: () => void
}

const ConfirmModal = ({
	visible,
	status,
	onTransactionsClick,
	dismiss,
}: Props) => {
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

		const title =
			status === 'success'
				? 'cn_confirm_bottomsheet_success_title'
				: status === 'pending'
				? 'cn_confirm_bottomsheet_pending_title'
				: 'cn_confirm_bottomsheet_error_title'

		const desc =
			status === 'success'
				? 'cn_confirm_bottomsheet_success_desc'
				: status === 'pending'
				? 'cn_confirm_bottomsheet_pending_desc'
				: 'cn_confirm_bottomsheet_error_desc'

		return (
			<View style={styles.container}>
				{image}
				<AppText variant="title" style={styles.title} medium>
					{title}
				</AppText>
				{desc && (
					<AppText variant="l" style={styles.desc}>
						{desc}
					</AppText>
				)}

				{(status === 'success' || status === 'pending') && (
					<AppButton
						variant="primary"
						text="cn_btn_transactions"
						style={styles.button}
						onPress={onTransactionsClick}
					/>
				)}
			</View>
		)
	}

	return (
		<AppModal hide={dismiss} visible={visible} children={children()} bottom />
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			alignItems: 'center',
		},
		desc: {
			color: theme.color.textSecondary,
		},
		title: {
			marginTop: 18,
			marginBottom: 15,
			color: theme.color.textPrimary,
		},
		button: {
			marginTop: 30,
			width: '60%',
			marginBottom: 10,
		},
	})

export default ConfirmModal
