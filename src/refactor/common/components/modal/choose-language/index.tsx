import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Theme, useTheme } from '@theme/index'
import AppModal from '@components/modal'
import AppText from '@components/text'
import { COUNTRIES_URL_PNG } from '@app/constants/api'
import images from '@app/constants/images'
import { useChooseLanguage } from './use-choose-language'

export const ChooseLanguageModal = ({
	languageModalVisible,
	setLanguageModalVisible,
}: {
	languageModalVisible: boolean
	setLanguageModalVisible: (v: boolean) => void
}) => {
	const { styles } = useTheme(_styles)
	const { chooseLanguage, hide, language } = useChooseLanguage({
		languageModalVisible,
		setLanguageModalVisible,
	})

	const background = (l: string) => {
		if (l === language) {
			return { backgroundColor: 'rgba(101, 130, 253, 0.1)' }
		}
	}

	const text = (l: string) => {
		if (l === 'en') return 'English'
		if (l === 'ka') return 'ქართული'
	}
	const uri = (l: string) => {
		if (l === 'en') return `${COUNTRIES_URL_PNG}/GBR.png`
		if (l === 'ka') return `${COUNTRIES_URL_PNG}/GEO.png`
	}

	const children = (
		<>
			{['en', 'ka'].map((l, i, a) => (
				<View key={l}>
					<Pressable
						style={[styles.button, background(l)]}
						onPress={() => chooseLanguage(l)}>
						<Image
							source={l === 'en' ? { uri: uri(l) } : images.GEO}
							style={styles.flag}
						/>
						<AppText style={styles.text}>{text(l)}</AppText>
					</Pressable>
					{i < a.length - 1 && <View style={styles.margin} />}
				</View>
			))}
		</>
	)

	return (
		<AppModal
			visible={languageModalVisible}
			hide={hide}
			bottom
			title="Choose Language"
			children={children}
		/>
	)
}

const _styles = (theme: Theme) =>
	StyleSheet.create({
		button: {
			height: 45,
			alignItems: 'center',
			// marginHorizontal: -13,
			paddingHorizontal: 10,
			flexDirection: 'row',
			borderRadius: 6,
		},
		flag: {
			height: 24,
			width: 24,
			marginRight: 20,
			borderRadius: 12,
		},
		margin: {
			marginVertical: 5,
		},
		text: {
			color: theme.color.textPrimary,
		},
	})
