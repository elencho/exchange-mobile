import React, { memo } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import ShowAll from '../assets/images/ShowAll'
import colors from '../constants/colors'
import AppText from './AppText'

const ModalSearchItem = ({
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
	realCode = '',
}) => {
	const backgroundCond = () => {
		if (
			name === currentItem ||
			code === currentItem ||
			realCode === currentItem
		) {
			return styles.background
		}
	}

	const codeText = phoneCountry ? phoneCode : code
	const text =
		phoneCountry || countryDrop || citizenshipDrop ? (
			<View style={styles.codeWrapper}>
				<AppText body medium style={[styles.primary, { width: 32 }]}>
					{codeText}
				</AppText>
				<AppText
					body
					medium
					numberOfLines={1}
					style={[styles.secondary, { flex: 1, marginLeft: 8 }]}>
					{name}
				</AppText>
			</View>
		) : (
			<View style={styles.row}>
				<AppText body medium style={styles.primary}>
					{isForTransactions ? name?.split('(')[0] : name}
				</AppText>

				<AppText body medium style={styles.secondary}>
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
		<AppText body medium style={styles.secondary}>
			{total}
		</AppText>
	)

	return (
		<Pressable style={[styles.container, backgroundCond()]} onPress={onPress}>
			{code !== 'Show all currency' ? (
				<FastImage
					style={styles.image}
					resizeMode="stretch"
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
export default memo(ModalSearchItem)

const styles = StyleSheet.create({
	background: { backgroundColor: 'rgba(101, 130, 253, 0.1 )' },
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 5,
		borderRadius: 5,
		paddingVertical: 6,
		paddingLeft: 10,
	},
	image: {
		marginRight: 14,
		width: 36,
		height: 36,
		borderRadius: 18,
	},
	primary: { color: colors.PRIMARY_TEXT },
	secondary: { color: colors.SECONDARY_TEXT },
	codeWrapper: {
		flexDirection: 'row',
		width: 250,
	},
	row: { flexDirection: 'row' },
})
