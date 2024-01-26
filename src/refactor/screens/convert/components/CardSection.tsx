import AppText from '@components/text'
import { Theme, useTheme } from '@theme/index'
import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import CheckEmpty from '@assets/images/Check_Empty.svg'
import CheckFull from '@assets/images/Check_Full.svg'
import AppDropdown from '@components/dropdown/index'

type Props = {
	chosenCard?: Card
	buyWithCardChecked: boolean
	setBuyWithCardChecked: (checked: boolean) => void
	chooseCardClicked: () => void
	error: boolean
}

const CardSection = ({
	chosenCard,
	buyWithCardChecked,
	setBuyWithCardChecked,
	chooseCardClicked,
	error,
}: Props) => {
	const { styles } = useTheme(_styles)

	return (
		<View style={styles.container}>
			<View style={styles.rowContainer}>
				<Pressable
					style={styles.radioContainer}
					onPress={() => setBuyWithCardChecked(!buyWithCardChecked)}>
					{buyWithCardChecked ? <CheckFull /> : <CheckEmpty />}
				</Pressable>
				<AppText variant="l" style={styles.buyText}>
					{'Buy with card'}
				</AppText>
			</View>
			{buyWithCardChecked && (
				<AppDropdown
					style={styles.dropdown}
					noTranslate
					notClearable
					handlePress={chooseCardClicked}
					label="Choose Card"
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
			)}
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
	})

export default CardSection
