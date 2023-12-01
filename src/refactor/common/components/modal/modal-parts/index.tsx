import { Pressable, StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import ShowAll from '@assets/images/ShowAll.svg'
import { Theme, useTheme } from '@theme/index'
import AppText from '@components/text'

interface ModalTopProps {
	bottom: boolean
}

export const ModalTop = (props: ModalTopProps) => {
	const { styles } = useTheme(_styles)
	const { bottom } = props
	return (
		<View style={[styles.top, bottom && { backgroundColor: 'none' }]}>
			<View style={styles.line} />
		</View>
	)
}

interface ModalWithSearchProps {
	name: string
	code: string
	onPress: () => void
	currentItem?: Country | any
	uri?: string
	phoneCountry?: boolean
	phoneCode?: string
	countryDrop?: string
	citizenshipDrop?: string
	total?: string
	canShowCode: boolean
	isForTransactions?: boolean
}

export const ModalSearchItem = (props: ModalWithSearchProps) => {
	const {
		name,
		code,
		onPress,
		currentItem,
		uri,
		phoneCountry,
		phoneCode,
		countryDrop,
		citizenshipDrop,
		total,
		canShowCode,
		isForTransactions,
	} = props
	const { styles } = useTheme(_styles)

	const backgroundCond = () => {
		if (name === currentItem || code === currentItem) {
			return styles.background
		}
	}
	const codeText = phoneCountry ? `(${phoneCode})` : code
	const text =
		phoneCountry || countryDrop || citizenshipDrop ? (
			<View style={styles.codeWrapper}>
				<AppText variant="title" style={styles.primary}>
					{codeText}
				</AppText>
				<AppText
					variant="title"
					numberOfLines={1}
					style={[styles.secondary, { flex: 1 }]}>
					{name}
				</AppText>
			</View>
		) : (
			<View style={styles.row}>
				<AppText variant="m" style={styles.primary}>
					{isForTransactions ? name.split('(')[0] : name}
				</AppText>

				<AppText variant="m" style={styles.secondary}>
					{!!canShowCode && ` (${code})`}
				</AppText>
			</View>
		)

	const shouldShowText =
		!!total &&
		!isForTransactions &&
		!phoneCountry &&
		!countryDrop &&
		!citizenshipDrop

	const altText = shouldShowText && (
		<AppText variant="m" style={styles.secondary}>
			{total}
		</AppText>
	)

	return (
		<Pressable style={[styles.container, backgroundCond()]} onPress={onPress}>
			{code !== 'Show all currency' ? (
				<View style={styles.border}>
					<FastImage
						style={styles.image}
						resizeMode="stretch"
						source={{
							uri,
							priority: FastImage.priority.normal,
						}}
					/>
				</View>
			) : (
				<ShowAll style={{ marginRight: 20 }} />
			)}
			<View>
				{text}
				{altText}
			</View>
		</Pressable>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		line: {
			height: 6,
			width: '25%',
			backgroundColor: theme.color.backgroundPrimary,
		},
		top: {
			height: 30,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: theme.color.backgroundPrimary,
		},
		background: {
			backgroundColor: 'rgba(101, 130, 253, 0.1 )',
		},
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 5,
			borderRadius: 5,
			paddingVertical: 6,
			paddingLeft: 10,
			marginRight: 10,
		},
		image: {
			width: 36,
			height: 36,
			borderRadius: 18,
		},
		primary: { color: theme.color.textPrimary, width: 60 },
		secondary: { color: theme.color.textSecondary },
		codeWrapper: {
			flexDirection: 'row',
			width: 250,
		},
		row: { flexDirection: 'row' },
		border: {
			width: 36,
			height: 36,
			marginRight: 14,
			borderRadius: 18,
		},
	})
