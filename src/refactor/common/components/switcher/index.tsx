import React from 'react'
import ToggleSwitch, { ToggleSwitchProps } from 'toggle-switch-react-native'
import { useTheme } from '@theme/index'

const AppSwitcher: React.FC<ToggleSwitchProps> = (props) => {
	const { isOn, disabled } = props
	const { theme } = useTheme()

	const circleColor = () => {
		if (!disabled && isOn) return theme.color.brandPrimary
		if (!disabled && !isOn) return '#4F5884'
		if (disabled && isOn) return 'rgba(74, 109, 255, 0.5)'
		if (disabled && !isOn) return 'rgba(79, 88, 132, 0.5)'
	}

	const onColor = 'rgba(106, 131, 237, 0.2)'
	const offColor = 'rgba(105, 111, 142, 0.2)'

	return (
		<ToggleSwitch
			circleColor={circleColor()}
			onColor={onColor}
			offColor={offColor}
			trackOffStyle={{ width: 35, height: 20 }}
			trackOnStyle={{ width: 35, height: 20 }}
			thumbOnStyle={{ transform: [{ translateX: 10 }] }}
			thumbOffStyle={{ transform: [{ translateX: 0 }] }}
			{...props}
		/>
	)
}
