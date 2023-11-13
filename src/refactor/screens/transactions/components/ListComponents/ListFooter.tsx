import React, { memo } from 'react'
import { View } from 'react-native'
import TransactionSkeleton from '@app/components/TransactionHistory/TransactionSkeleton'

interface Props {
	dataArray: any[]
	totalDataQty: number
	isLoading: boolean
	isInstantTrade: boolean
}

const ListFooter: React.FC<Props> = ({
	dataArray,
	totalDataQty,
	isLoading,
	isInstantTrade,
}) => {
	return (
		<>
			{dataArray?.length > 0 &&
			dataArray?.length < totalDataQty &&
			!isLoading ? (
				<TransactionSkeleton
					length={[1]}
					isInstantTrade={isInstantTrade}
					isFooter
				/>
			) : (
				<View />
			)}
		</>
	)
}

export default memo(ListFooter)
