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
	// TODO: fix any type on state
	currentItem?: any
	uri?: string
	phoneCountry: string
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
	const codeText = phoneCountry ? phoneCode : code
	const text =
		phoneCountry || countryDrop || citizenshipDrop ? (
			<View style={styles.codeWrapper}>
				<AppText variant="m" style={styles.primary}>
					({codeText})
				</AppText>
				<AppText
					variant="m"
					numberOfLines={1}
					style={[styles.secondary, { flex: 1 }]}>
					{' '}
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
				<FastImage
					style={styles.image}
					resizeMode="contain"
					source={{
						uri,
						priority: FastImage.priority.normal,
					}}
				/>
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
	})
