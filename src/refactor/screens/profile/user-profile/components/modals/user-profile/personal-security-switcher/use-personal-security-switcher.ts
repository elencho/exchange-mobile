interface Props {
	personalSecurity: string
	setPersonalSecurity: (val: string) => void
}

const usePersonalSecuritySwitcher = (
	personalSecurity: string,
	setPersonalSecurity: (val: string) => void
) => {
	// const { personalSecurity, setPersonalSecurity } = props

	const handleSwitch = (filter: string) => {
		setPersonalSecurity(filter)
	}

	return { handleSwitch, personalSecurity }
}

export default usePersonalSecuritySwitcher
