import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import CheckEmpty from '@assets/images/Check_Empty.svg'
import CheckFull from '@assets/images/Check_Full.svg'
import AppDropdown from '@components/dropdown/index'
import Skeleton from '@components/skeleton'
import Arrow from '@assets/images/Arrow.svg'
import { t } from 'i18next'

type Props = {
	chosenCard?: Card
	buyWithCardChecked: boolean
	setBuyWithCardChecked: (checked: boolean) => void
	chooseCardClicked: () => void
	error: boolean
	loading: boolean
}

const CardSection = ({
	chosenCard,
	buyWithCardChecked,
	setBuyWithCardChecked,
	chooseCardClicked,
	error,
	loading,
}: Props) => {
	const { styles } = useTheme(_styles)

	const DropdrownSkeleton = () => {
		return (
			<View style={styles.dropdownContainer}>
				<Skeleton
					width={28}
					height={20}
					style={{ borderRadius: 6, marginEnd: 12 }}
				/>
				<Skeleton width={95} height={6} style={{}} />
				<View style={{ flex: 1 }} />
				<View style={{ paddingEnd: 22, marginEnd: 2 }}>
					<Arrow />
				</View>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<View style={styles.rowContainer}>
				<Pressable
					style={styles.radioContainer}
					onPress={() => {
						if (!loading) {
							setBuyWithCardChecked(!buyWithCardChecked)
						}
					}}>
					{buyWithCardChecked ? <CheckFull /> : <CheckEmpty />}
				</Pressable>
				<AppText variant="l" style={styles.buyText}>
					cn_buy_with_card
				</AppText>
			</View>
			{buyWithCardChecked &&
				(loading ? (
					<DropdrownSkeleton />
				) : (
					<AppDropdown
						style={styles.dropdown}
						noTranslate
						notClearable
						handlePress={chooseCardClicked}
						label={t('cn_select_card_title')}
						selectedText={chosenCard && chosenCard?.cardNumber}
						icon={
							chosenCard && (
								<Image
									source={{ uri: chosenCard.iconPngUrl }}
									style={{ width: 20, height: 20, resizeMode: 'contain' }}
								/>
							)
						}
						error={error}
					/>
				))}
		</View>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			marginTop: 20,
		},
		rowContainer: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		radioContainer: {
			justifyContent: 'center',
			alignItems: 'center',
			marginRight: 12,
		},
		dropdown: {
			marginTop: 20,
		},
		buyText: {
			color: theme.color.textThird,
		},
		dropdownContainer: {
			borderWidth: 1,
			borderRadius: 6,
			marginTop: 20,
			flexDirection: 'row',
			alignItems: 'center',
			paddingStart: 22,
			borderColor: theme.color.border,
			height: 44,
		},
	})

export default CardSection
