import React from 'react'
import { View, StyleSheet, StyleProp } from 'react-native'
import { Theme, useTheme } from '@theme/index'
import AppSwitcher from '@components/switcher'
import AppText from '@components/text'
import Skeleton from '@app/components/Skeleton'

const FirstPart = ({
	hasSwitch,
	styles,
}: {
	hasSwitch?: boolean
	styles?: StyleProp<any>
}) => (
	<View style={styles.mainWrapper}>
		<View style={styles.wrapper}>
			<View style={styles.lastWrapper}>
				<Skeleton width={34} height={34} style={{ borderRadius: 100 }} />
				<View style={styles.smallWrapper}>
					<Skeleton width={58} height={10} style={{ marginBottom: 15 }} />
					<Skeleton width={120} height={8} />
				</View>
			</View>
			<View>{hasSwitch && <AppSwitcher disabled />}</View>
		</View>
	</View>
)

const PersonalSecuritySkeleton = () => {
	const { styles } = useTheme(_styles)
	return (
		<>
			<View style={styles.container}>
				<AppText style={styles.text}>
					2FA is specific type of multi-factor authentication that strengthens
					access security
				</AppText>

				{[1, 2, 3].map((n, i) => (
					<View key={i}>
						<FirstPart hasSwitch />
					</View>
				))}
				<View style={styles.line} />
				<FirstPart hasSwitch />
				<FirstPart />
			</View>
		</>
	)
}

export default PersonalSecuritySkeleton

const _styles = (theme: Theme) =>
	StyleSheet.create({
		wrapper: {
			flexDirection: 'row',
			flex: 1,
		},
		smallWrapper: {
			marginLeft: 18,
			justifyContent: 'center',
		},
		lastWrapper: {
			flexDirection: 'row',
			flex: 1,
		},
		secSmallWrapper: {
			alignItems: 'flex-end',
			justifyContent: 'center',
		},
		mainWrapper: {
			marginTop: 36,
		},
		container: {
			backgroundColor: theme.color.backgroundPrimary,
			paddingHorizontal: 5,
			paddingBottom: 30,
			marginBottom: 12,
		},
		line: {
			height: 2,
			width: '100%',
			backgroundColor: theme.color.backgroundSecondary,
			marginTop: 25,
		},
		text: {
			color: '#696F8E',
			fontSize: 12,
		},
	})
