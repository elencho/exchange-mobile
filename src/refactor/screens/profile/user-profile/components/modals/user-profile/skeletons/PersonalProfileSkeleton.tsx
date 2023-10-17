import React from 'react'
import { View, StyleSheet, StyleProp } from 'react-native'
import { Theme, useTheme } from '@theme/index'

import AppSwitcher from '@components/switcher'
import Skeleton from '@app/components/Skeleton'

const FirstPart = ({
	hasSwitch,
	styles,
}: {
	hasSwitch: boolean
	styles: StyleProp<any>
}) => (
	<View style={styles.mainWrapper}>
		<View style={styles.wrapper}>
			<View style={styles.lastWrapper}>
				<Skeleton width={34} height={34} style={{ borderRadius: 100 }} />
				<View style={styles.smallWrapper}>
					<Skeleton width={58} height={10} style={{ marginBottom: 13 }} />
					<Skeleton width={190} height={8} />
				</View>
			</View>
			<View>{hasSwitch && <AppSwitcher disabled />}</View>
		</View>
	</View>
)

const SecondPart = ({ styles }: { styles: StyleProp<any> }) => (
	<View style={styles.containerSec}>
		<View style={styles.wrapper}>
			<View style={styles.lastWrapper}>
				<View style={{ marginLeft: 10 }}>
					<Skeleton
						width={122}
						height={12}
						style={{ marginBottom: 24, marginTop: 30 }}
					/>
					<Skeleton width={95} height={8} style={{ marginBottom: 14 }} />
					<Skeleton width={65} height={8} style={{ marginBottom: 14 }} />
					<Skeleton width={95} height={8} style={{ marginBottom: 14 }} />
				</View>
			</View>
			<View style={styles.secSmallWrapper}>
				<View style={{ marginBottom: 24, marginTop: 30, height: 10 }} />
				<Skeleton width={96} height={10} style={{ marginBottom: 14 }} />
				<Skeleton width={65} height={10} style={{ marginBottom: 14 }} />
				<Skeleton width={96} height={10} style={{ marginBottom: 14 }} />
			</View>
		</View>
		<View
			style={{
				paddingHorizontal: 9,
				marginTop: 30,
				flexDirection: 'row',
				justifyContent: 'space-between',
			}}>
			<View>
				<Skeleton width={65} height={8} style={{ marginBottom: 14 }} />
				<Skeleton width={95} height={8} style={{ marginBottom: 14 }} />
			</View>
			<View>
				<Skeleton
					width={65}
					height={8}
					style={{ marginBottom: 14, alignSelf: 'flex-end' }}
				/>
				<Skeleton width={95} height={8} style={{ marginBottom: 14 }} />
			</View>
		</View>
	</View>
)

const PersonalProfileSkeleton = () => {
	const { styles } = useTheme(_styles)
	return (
		<>
			<View style={styles.container}>
				{[1, 2, 3, 4].map((n, i) => (
					<View key={i}>
						<FirstPart styles={styles} hasSwitch={i === 2} />
					</View>
				))}
			</View>
			<View style={styles.line} />
			<SecondPart styles={styles} />
			<View style={styles.line} />
			<Skeleton
				width={195}
				height={8}
				style={{ marginTop: 20, marginBottom: 40, marginLeft: 6 }}
			/>
		</>
	)
}

export default PersonalProfileSkeleton

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
			marginBottom: 30,
		},
		container: {
			backgroundColor: theme.color.backgroundPrimary,
			paddingHorizontal: 5,
			paddingBottom: 30,
			marginBottom: 12,
		},
		containerSec: {
			backgroundColor: theme.color.backgroundPrimary,
			paddingBottom: 30,
			marginBottom: 12,
		},
		line: {
			height: 2,
			width: '100%',
			backgroundColor: theme.color.backgroundSecondary,
			marginHorizontal: 5,
		},
	})
