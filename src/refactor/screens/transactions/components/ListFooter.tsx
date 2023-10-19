import React, { memo } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import TransactionSkeleton from '@app/components/TransactionHistory/TransactionSkeleton'

interface Props {
	dataArray: any[]
	totalDataQty: number
	isLoading: boolean
}

const ListFooter: React.FC<Props> = ({
	dataArray,
	totalDataQty,
	isLoading,
}) => {
	const activeTab = useSelector((state) => state.transactions.activeTab)

	return (
		<>
			{dataArray?.length > 0 &&
			dataArray?.length < totalDataQty &&
			!isLoading ? (
				<TransactionSkeleton
					length={[1]}
					isInstantTrade={activeTab === 'Instant trade'}
					isFooter
				/>
			) : (
				<View />
			)}
		</>
	)
}

export default memo(ListFooter)
