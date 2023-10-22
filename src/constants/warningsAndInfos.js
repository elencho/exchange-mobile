import { Trans } from 'react-i18next'
import AppText from '../components/AppText'

const light = <AppText style={{ color: '#FFFBF3' }} />
const gold = <AppText style={{ color: '#F2DFB4' }} />

export const warnings = {
	sepa: [
		<Trans
			i18nKey="Make sure your bank supports SEPA transfers"
			components={{ light, gold }}
		/>,
		<Trans
			i18nKey="Wire transfers take up to 1 working day"
			components={{ light, gold }}
		/>,
	],
	swift: {
		deposit: [
			<Trans i18nKey="Wire Transfers Deposit" components={{ light, gold }} />,
		],
		withdrawal: [
			<Trans
				i18nKey="Wire Transfers Withdrawal"
				components={{ light, gold }}
			/>,
		],
	},
}

export const infos = {
	ecommerce: {
		deposit: ['Deposit Ecommerce Info'],
		withdrawal: ['Withdrawal Ecommerce info'],
	},
}
